"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  listAdminPublications,
  removePublication,
  updatePublication,
} from "@/lib/firebase/adminCrud";

export default function AdminPublicationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await listAdminPublications();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function togglePublish(id: string, status: "draft" | "published") {
    await updatePublication(id, {
      status: status === "published" ? "draft" : "published",
      publishedAt: status === "published" ? null : new Date(),
    });
    await load();
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this publication?")) return;
    await removePublication(id);
    await load();
  }

  return (
    <section className="section">
      <div className="container">
        {/* header */}
        <div className="adminHeaderRow">
          <h1 className="h-serif adminTitle">Publications</h1>

          <Link className="btn adminNewBtn" href="/admin/publications/new">
            NEW PUBLICATION <span aria-hidden>→</span>
          </Link>
        </div>

        <div style={{ height: 18 }} />
        <hr className="sep" />
        <div style={{ height: 12 }} />

        {loading ? (
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading…</p>
        ) : items.length === 0 ? (
          <p style={{ margin: 0, color: "var(--muted)" }}>No items yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {items.map((p) => (
              <div key={p.id} className="card adminRowCard">
                <div className="adminRow">
                  {/* left: meta */}
                  <div className="adminRowMeta">
                    <div className="kicker">
                      {p.type ?? "—"} • {p.status ?? "draft"}
                    </div>

                    <div className="h-serif adminRowTitle">
                      {p.title ?? "Untitled"}
                    </div>
                  </div>

                  {/* right: actions */}
                  <div className="adminActions">
                    <button
                      className="pill adminActionBtn"
                      onClick={() => togglePublish(p.id, p.status)}
                      type="button"
                    >
                      {p.status === "published" ? "Unpublish" : "Publish"}
                    </button>

                    <Link
                      className="pill adminActionBtn"
                      href={`/admin/publications/${p.id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="pill adminActionBtn"
                      onClick={() => onDelete(p.id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ responsive styles */}
      <style jsx>{`
        .adminHeaderRow {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: baseline;
        }

        .adminTitle {
          font-size: 64px;
          margin: 0;
          line-height: 1.05;
        }

        .adminNewBtn {
          white-space: nowrap;
        }

        .adminRowCard {
          padding: 16px;
          border-radius: 0;
        }

        .adminRow {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .adminRowMeta {
          min-width: 0;
        }

        .adminRowTitle {
          font-size: 22px;
          font-weight: 700;
          margin-top: 6px;
          line-height: 1.2;
          word-break: break-word;
        }

        .adminActions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .adminActionBtn {
          padding: 10px 14px;
        }

        @media (max-width: 900px) {
          .adminTitle {
            font-size: 48px;
          }

          .adminRow {
            flex-direction: column;
            align-items: stretch;
          }

          .adminActions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 560px) {
          .adminHeaderRow {
            flex-direction: column;
            align-items: stretch;
          }

          .adminNewBtn {
            width: fit-content;
          }

          .adminTitle {
            font-size: 38px;
          }

          /* on small screens make actions feel like a toolbar */
          .adminActions {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }

          .adminActionBtn {
            text-align: center;
            padding: 12px 12px;
          }
        }

        @media (max-width: 420px) {
          /* if phone is very narrow, stack actions */
          .adminActions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
