"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

type Research = {
  title?: string;
  type?: string;
  summary?: string;
  coverImageUrl?: string | null;
  contentFormat?: "markdown" | "html" | "pdf";
  content?: string | null;
  pdfUrl?: string | null;
};

export default function ResearchDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<Research | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const q = query(
        collection(db, "research"),
        where("status", "==", "published"),
        where("slug", "==", slug),
        limit(1)
      );

      const snap = await getDocs(q);
      if (snap.empty) {
        setItem(null);
        setLoading(false);
        return;
      }

      setItem(snap.docs[0].data() as any);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading…</p>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h1 className="h-serif" style={{ fontSize: 60, margin: "0 0 10px" }}>Not found</h1>
          <Link className="btn" href="/research">BACK TO RESEARCH →</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section" style={{ paddingBottom: 30 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <Link href="/research" style={{ color: "var(--muted)", fontSize: 13 }}>
            ← Back to Research
          </Link>

          <div style={{ height: 14 }} />
          <div className="kicker">{(item.type ?? "Research").toUpperCase()}</div>

          <h1 className="h-serif" style={{ fontSize: 72, lineHeight: 1.02, margin: "10px 0 10px" }}>
            {item.title ?? "Untitled"}
          </h1>

          {item.summary ? (
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.85, fontSize: 16 }}>
              {item.summary}
            </p>
          ) : null}

          {item.coverImageUrl ? (
            <>
              <div style={{ height: 18 }} />
              <div
                style={{
                  height: 360,
                  border: "1px solid rgba(47,36,32,.12)",
                  background: `url('${item.coverImageUrl}') center/cover no-repeat`,
                }}
              />
            </>
          ) : null}
        </div>
      </section>

      <section className="sagePanel" style={{ padding: "42px 0" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="card" style={{ background: "var(--bg)", padding: 22 }}>
            <BodyRenderer item={item} />
          </div>
        </div>
      </section>
    </>
  );
}

function BodyRenderer({ item }: { item: Research }) {
  if (item.contentFormat === "pdf") {
    return item.pdfUrl ? (
      <div style={{ display: "grid", gap: 12 }}>
        <p style={{ margin: 0, color: "rgba(47,36,32,.75)", lineHeight: 1.85 }}>
          This research item is available as a PDF.
        </p>

        <a className="btn" href={item.pdfUrl} target="_blank" rel="noreferrer" style={{ width: "fit-content" }}>
          DOWNLOAD PDF <span aria-hidden>→</span>
        </a>
      </div>
    ) : (
      <p style={{ margin: 0, color: "rgba(47,36,32,.65)" }}>PDF not available.</p>
    );
  }

  if (item.contentFormat === "html") {
    return (
      <div
        style={{ color: "rgba(47,36,32,.82)", lineHeight: 1.9, fontSize: 16 }}
        dangerouslySetInnerHTML={{ __html: item.content ?? "" }}
      />
    );
  }

  return (
    <div style={{ whiteSpace: "pre-wrap", color: "rgba(47,36,32,.82)", lineHeight: 1.9, fontSize: 16 }}>
      {item.content ?? ""}
    </div>
  );
}
