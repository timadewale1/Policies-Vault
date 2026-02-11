"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RevealWhileInView, SlideUpOnLoad } from "@/components/ScrollMotion";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

type ResearchDoc = {
  id: string;
  title?: string;
  slug?: string;
  summary?: string;
  type?: string; // dynamically used for filters
  coverImageUrl?: string | null;
  publishedAt?: any;
  status?: string;
};

export default function ResearchPage() {
  const [active, setActive] = useState<string>("All");
  const [items, setItems] = useState<ResearchDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const q = query(
        collection(db, "research"),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc")
      );
      const snap = await getDocs(q);
      const rows: ResearchDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setItems(rows);
      setLoading(false);
    })();
  }, []);

  const filters = useMemo(() => {
    return ["All", "Article", "Commentary", "Brief", "Analysis"];
  }, []);

  const visible = useMemo(() => {
    if (active === "All") return items;
    return items.filter((r) => (r.type ?? "").toLowerCase() === active.toLowerCase());
  }, [items, active]);

  return (
    <>
      {/* HEADER */}
      <section className="section" style={{ paddingBottom: 54 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <SlideUpOnLoad>
            <h1 className="h-serif" style={{ fontSize: 96, margin: "10px 0 10px" }}>
              Research Interests
            </h1>
          </SlideUpOnLoad>

          <SlideUpOnLoad delay={0.08}>
            <p
              style={{
                margin: "0 auto",
                maxWidth: 860,
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: 19,
              }}
            >
              Current research topics and areas of investigation in international
              <br />
              development and institutional governance.
            </p>
          </SlideUpOnLoad>

          {/* Research Filters */}
          <SlideUpOnLoad delay={0.12}>
            <div className="pillRow" style={{ flexWrap: "wrap" }}>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`pill ${active === f ? "pillActive" : ""}`}
                  onClick={() => setActive(f)}
                  type="button"
                >
                  {f}
                </button>
              ))}
            </div>
          </SlideUpOnLoad>
        </div>
      </section>

      {/* SAGE PANEL WITH CARDS */}
      <section className="sagePanel" style={{ padding: "44px 0", minHeight: 520 }}>
        <div className="container">
          {loading ? (
            <p style={{ margin: 0, color: "rgba(47,36,32,.55)", fontSize: 13, textAlign: "center" }}>
              Loading…
            </p>
          ) : visible.length === 0 ? (
            <p style={{ margin: 0, color: "rgba(47,36,32,.55)", fontSize: 13, textAlign: "center" }}>
              No research found.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 18,
                paddingTop: 10,
              }}
            >
              {visible.map((r) => (
                <ResearchCard key={r.id} item={r} />
              ))}
            </div>
          )}

          <div style={{ height: 22 }} />
        </div>
      </section>

      {/* RESEARCH APPROACH (unchanged motion) */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 1fr",
              gap: 34,
              alignItems: "center",
            }}
          >
            <RevealWhileInView from="left">
              <div>
                <h2 className="h-serif" style={{ fontSize: 64, margin: 0, lineHeight: 1.05 }}>
                  Research Approach
                </h2>

                <p style={{ marginTop: 18, color: "var(--muted)", lineHeight: 1.9, fontSize: 18, maxWidth: 520 }}>
                  My research combines rigorous empirical analysis with practical policy insights,
                  drawing from both quantitative and qualitative methodologies.
                </p>

                <p style={{ marginTop: 14, color: "var(--muted)", lineHeight: 1.9, fontSize: 18, maxWidth: 520 }}>
                  I focus on understanding how international development institutions can improve their effectiveness
                  and better serve the communities they aim to support.
                </p>

                <p style={{ marginTop: 14, color: "var(--muted)", lineHeight: 1.9, fontSize: 18, maxWidth: 520 }}>
                  Each research project is designed to contribute actionable insights that can inform policy decisions
                  and institutional practices.
                </p>
              </div>
            </RevealWhileInView>

            <RevealWhileInView from="right">
              <div
                style={{
                  minHeight: 560,
                  background: "url('/research.jpg') center/cover no-repeat",
                  border: "1px solid rgba(47,36,32,.12)",
                }}
              />
            </RevealWhileInView>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .pillRow {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}

function ResearchCard({ item }: { item: ResearchDoc }) {
  const href = item.slug ? `/research/${item.slug}` : `/research/${item.id}`;

  return (
    <Link
      href={href}
      className="card"
      style={{
        display: "grid",
        gridTemplateRows: item.coverImageUrl ? "200px 1fr" : "1fr",
        background: "var(--bg)",
        border: "1px solid rgba(47,36,32,.18)",
        textDecoration: "none",
      }}
    >
      {item.coverImageUrl ? (
        <div
          style={{
            background: `url('${item.coverImageUrl}') center/cover no-repeat`,
            borderBottom: "1px solid rgba(47,36,32,.12)",
          }}
        />
      ) : null}

      <div style={{ padding: 18 }}>
        <div className="kicker" style={{ marginBottom: 10 }}>
          {(item.type ?? "Research").toUpperCase()}
        </div>

        <div className="h-serif" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15 }}>
          {item.title ?? "Untitled"}
        </div>

        {item.summary ? (
          <p style={{ margin: "10px 0 0", color: "rgba(47,36,32,.72)", lineHeight: 1.85, fontSize: 14 }}>
            {item.summary}
          </p>
        ) : null}

        <div style={{ height: 12 }} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "rgba(47,36,32,.65)" }}>{formatDate(item.publishedAt)}</span>
          <span style={{ fontSize: 18, color: "rgba(47,36,32,.65)" }} aria-hidden>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(v: any) {
  try {
    const d =
      v?.toDate?.() ??
      (typeof v === "string" ? new Date(v) : v instanceof Date ? v : null);
    if (!d) return "";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}
