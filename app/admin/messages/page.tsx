"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listAdminMessages } from "@/lib/firebase/adminCrud";

export default function AdminMessagesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await listAdminMessages();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="h-serif adminTitle">Messages</h1>

        <hr className="sep" />
        <div style={{ height: 12 }} />

        {loading ? (
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading…</p>
        ) : items.length === 0 ? (
          <p style={{ margin: 0, color: "var(--muted)" }}>No messages yet.</p>
        ) : (
          <div className="msgGrid">
            {items.map((m) => (
              <Link
                key={m.id}
                href={`/admin/messages/${m.id}`}
                className="card msgCard"
              >
                <div className="kicker msgMeta">
                  {(m.status ?? "new").toUpperCase()} •{" "}
                  <span className="msgEmail">{m.email ?? "—"}</span>
                </div>

                <div className="h-serif msgSubject">
                  {m.subject ?? "No subject"}
                </div>

                <p className="msgPreview">
                  {(m.message ?? "").slice(0, 160)}
                  {(m.message ?? "").length > 160 ? "…" : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ✅ responsive styles */}
      <style jsx>{`
        .adminTitle {
          font-size: 64px;
          margin: 0 0 18px;
          line-height: 1.05;
        }

        .msgGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .msgCard {
          padding: 16px;
          border-radius: 0;
          text-decoration: none;
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .msgMeta {
          display: block;
          word-break: break-word;
        }

        .msgEmail {
          color: rgba(47, 36, 32, 0.75);
        }

        .msgSubject {
          font-size: 22px;
          font-weight: 700;
          margin-top: 6px;
          line-height: 1.2;
          word-break: break-word;
        }

        .msgPreview {
          margin: 10px 0 0;
          color: rgba(47, 36, 32, 0.7);
          line-height: 1.85;
          font-size: 13px;
          word-break: break-word;
        }

        @media (max-width: 900px) {
          .adminTitle {
            font-size: 48px;
          }
          .msgGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .adminTitle {
            font-size: 38px;
          }
          .msgCard {
            padding: 14px;
          }
          .msgSubject {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
