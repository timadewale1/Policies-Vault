"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { generateAndDownloadPdf } from "@/lib/pdfGenerator";
import { useToast } from "@/components/ToastProvider";

type Pub = {
  title?: string;
  type?: string;
  excerpt?: string;
  coverImageUrl?: string | null;
  contentFormat?: "markdown" | "html" | "pdf";
  content?: string | null;
  pdfUrl?: string | null;
  publishedAt?: any;
};

export default function PublicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const toast = useToast();
  const [item, setItem] = useState<Pub | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const q = query(
        collection(db, "publications"),
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

  const handleDownloadPdf = async () => {
    if (!item) return;
    setDownloadingPdf(true);
    try {
      await generateAndDownloadPdf({
        title: item.title || "Untitled",
        content: item.content || "",
        type: item.type,
        status: item.contentFormat,
        contentFormat: item.contentFormat,
      });
      toast.success("PDF downloaded!");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to generate PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

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
          <Link className="btn" href="/publications">BACK TO PUBLICATIONS →</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section" style={{ paddingBottom: 30 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <Link href="/publications" style={{ color: "var(--muted)", fontSize: 13 }}>
              ← Back to Publications
            </Link>
            {item?.contentFormat !== "pdf" && item?.content && (
              <button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "rgba(47, 36, 32, 0.08)",
                  border: "1px solid rgba(47, 36, 32, 0.18)",
                  color: "rgba(47, 36, 32, 0.8)",
                  cursor: downloadingPdf ? "not-allowed" : "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {downloadingPdf ? "Generating…" : "Download as PDF"}
              </button>
            )}
          </div>

          <div style={{ height: 14 }} />
          <div className="kicker">{(item.type ?? "Publication").toUpperCase()}</div>

          <h1 className="h-serif" style={{ fontSize: 72, lineHeight: 1.02, margin: "10px 0 10px" }}>
            {item.title ?? "Untitled"}
          </h1>

          {item.excerpt ? (
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.85, fontSize: 16 }}>
              {item.excerpt}
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

function BodyRenderer({ item }: { item: Pub }) {
  if (item.contentFormat === "pdf") {
    return item.pdfUrl ? (
      <div style={{ display: "grid", gap: 12 }}>
        <p style={{ margin: 0, color: "rgba(47,36,32,.75)", lineHeight: 1.85 }}>
          This publication is available as a PDF.
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

  // markdown - convert markdown syntax to HTML
  const markdownToHtml = (md: string) => {
    return md
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");
  };

  const htmlContent = item.content ? markdownToHtml(item.content) : "";

  return (
    <div
      style={{ color: "rgba(47,36,32,.82)", lineHeight: 1.9, fontSize: 16 }}
      dangerouslySetInnerHTML={{ __html: `<p>${htmlContent}</p>` }}
    />
  );
}
