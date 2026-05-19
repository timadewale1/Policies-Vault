"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SlideUpOnLoad } from "@/components/ScrollMotion";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useToast } from "@/components/ToastProvider";
import { generateAndDownloadPdf } from "@/lib/pdfGenerator";

type Filter = "All" | "Article" | "Commentary" | "Brief" | "Analysis";

type PubDoc = {
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  type?: string; // Article | Commentary | Brief | Analysis
  status?: string;
  coverImageUrl?: string | null;
  publishedAt?: any;
  content?: string | null;
  contentFormat?: "markdown" | "html" | "pdf";
};

export default function PublicationsPage() {
  const [active, setActive] = useState<Filter>("All");
  const [items, setItems] = useState<PubDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const filters: Filter[] = useMemo(
    () => ["All", "Article", "Commentary", "Brief", "Analysis"],
    []
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const q = query(
        collection(db, "publications"),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc")
      );
      const snap = await getDocs(q);
      const rows: PubDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setItems(rows);
      setLoading(false);
    })();
  }, []);

  const visible = useMemo(() => {
    if (active === "All") return items;
    return items.filter((p) => (p.type ?? "").toLowerCase() === active.toLowerCase());
  }, [items, active]);

  return (
    <>
      {/* HEADER */}
      <section className="section" style={{ paddingBottom: 54 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <SlideUpOnLoad>
            <h1 className="h-serif" style={{ fontSize: 80, margin: "10px 0 10px" }}>
              Publications
            </h1>
          </SlideUpOnLoad>

          <SlideUpOnLoad delay={0.08}>
            <p
              style={{
                margin: "0 auto",
                maxWidth: 820,
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: 18,
              }}
            >
              Policy analysis, commentary, and research briefs examining sustainable development,
              climate finance, ESG governance, and institutional effectiveness
            </p>
          </SlideUpOnLoad>

          {/* FILTERS */}
          <SlideUpOnLoad delay={0.12}>
            <div className="pillRow">
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
              No publications found.
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
              {visible.map((p) => (
                <PublicationCard key={p.id} item={p} />
              ))}
            </div>
          )}

          <div style={{ height: 22 }} />
        </div>
      </section>

      {/* simple responsive tweak */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .pubGrid2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

function PublicationCard({ item }: { item: PubDoc }) {
  const href = item.slug ? `/publications/${item.slug}` : `/publications/${item.id}`;
  const toast = useToast();
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPdf = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDownloadingPdf(true);
    try {
      await generateAndDownloadPdf({
        title: item.title || "Untitled",
        content: item.content || "",
        type: item.type,
        status: "published",
        contentFormat: item.contentFormat,
      });
      toast.success("PDF downloaded!");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to generate PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div
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

      <div style={{ padding: 18, display: "grid", gridTemplateRows: "1fr auto" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 10 }}>
            {(item.type ?? "Publication").toUpperCase()}
          </div>

          <Link
            href={href}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="h-serif" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15 }}>
              {item.title ?? "Untitled"}
            </div>

            {item.excerpt ? (
              <p style={{ margin: "10px 0 0", color: "rgba(47,36,32,.72)", lineHeight: 1.85, fontSize: 14 }}>
                {item.excerpt}
              </p>
            ) : null}
          </Link>
        </div>

        <div>
          <div style={{ height: 12 }} />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "rgba(47,36,32,.65)" }}>{formatDate(item.publishedAt)}</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {item?.contentFormat !== "pdf" && item?.content && (
                <button
                  onClick={handleDownloadPdf}
                  disabled={downloadingPdf}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "rgba(47, 36, 32, 0.08)",
                    border: "1px solid rgba(47, 36, 32, 0.18)",
                    color: "rgba(47, 36, 32, 0.8)",
                    cursor: downloadingPdf ? "not-allowed" : "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  title="Download as PDF"
                >
                  {downloadingPdf ? "…" : "PDF"}
                </button>
              )}
              <Link
                href={href}
                style={{
                  fontSize: 18,
                  color: "rgba(47,36,32,.65)",
                  textDecoration: "none",
                }}
                aria-hidden
              >
                →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
