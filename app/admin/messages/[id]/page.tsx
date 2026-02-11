"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMessage, updateMessage } from "@/lib/firebase/adminCrud";

export default function AdminMessageDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<any | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getMessage(id);
      setItem(data);
      setNote(data?.adminNotes ?? "");
    })();
  }, [id]);

  if (!item) {
    return (
      <section className="section">
        <div className="container">
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading…</p>
        </div>
      </section>
    );
  }

  async function setStatus(status: "new" | "read" | "replied") {
    await updateMessage(id, { status });
    const fresh = await getMessage(id);
    setItem(fresh);
  }

  async function saveNote() {
    await updateMessage(id, { adminNotes: note });
    const fresh = await getMessage(id);
    setItem(fresh);
  }

  return (
    <section className="section">
      <div className="container">
        {/* header */}
        <div className="adminHeaderRow">
          <h1 className="h-serif adminTitle">Message</h1>

          <button
            className="pill adminBackBtn"
            onClick={() => router.push("/admin/messages")}
            type="button"
          >
            Back
          </button>
        </div>

        <div className="card adminCard">
          <div className="kicker">{(item.status ?? "new").toUpperCase()}</div>

          <div className="h-serif adminSubject">
            {item.subject ?? "No subject"}
          </div>

          <div className="adminFrom">
            <div>
              <b>From:</b>{" "}
              <span className="adminFromText">
                {item.name ?? "—"} ({item.email ?? "—"})
              </span>
            </div>
          </div>

          <hr className="sep" style={{ margin: "16px 0" }} />

          <p className="adminMessageBody">{item.message ?? ""}</p>

          <hr className="sep" style={{ margin: "16px 0" }} />

          <div className="adminActions">
            <button className="pill adminActionBtn" onClick={() => setStatus("read")} type="button">
              Mark read
            </button>
            <button className="pill adminActionBtn" onClick={() => setStatus("replied")} type="button">
              Mark replied
            </button>
          </div>

          <div style={{ height: 16 }} />

          <label className="adminLabel">
            Admin notes
            <textarea
              className="adminTextarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>

          <div style={{ height: 10 }} />
          <button className="btn" onClick={saveNote} type="button">
            SAVE NOTES <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* ✅ responsive styles */}
      <style jsx>{`
        .adminHeaderRow {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: baseline;
          margin-bottom: 18px;
        }

        .adminTitle {
          font-size: 56px;
          margin: 0;
          line-height: 1.05;
        }

        .adminBackBtn {
          padding: 10px 14px;
          white-space: nowrap;
        }

        .adminCard {
          padding: 18px;
          border-radius: 0;
        }

        .adminSubject {
          font-size: 28px;
          font-weight: 800;
          margin-top: 8px;
          line-height: 1.15;
          word-break: break-word;
        }

        .adminFrom {
          margin-top: 10px;
          color: rgba(47, 36, 32, 0.75);
          font-size: 13px;
          line-height: 1.8;
          word-break: break-word;
        }

        .adminFromText {
          color: rgba(47, 36, 32, 0.78);
        }

        .adminMessageBody {
          margin: 0;
          color: rgba(47, 36, 32, 0.8);
          line-height: 1.9;
          word-break: break-word;
          white-space: pre-wrap;
        }

        .adminActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .adminActionBtn {
          padding: 10px 14px;
        }

        .adminLabel {
          display: grid;
          gap: 8px;
          color: var(--muted);
          font-size: 13px;
        }

        .adminTextarea {
          border: 1px solid rgba(47, 36, 32, 0.28);
          padding: 12px 12px;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 13px;
          color: rgba(47, 36, 32, 0.8);
          min-height: 120px;
          resize: none;
        }

        @media (max-width: 900px) {
          .adminTitle {
            font-size: 48px;
          }
          .adminSubject {
            font-size: 24px;
          }
        }

        @media (max-width: 560px) {
          .adminHeaderRow {
            flex-direction: column;
            align-items: stretch;
          }

          .adminTitle {
            font-size: 38px;
          }

          .adminBackBtn {
            width: fit-content;
          }

          /* make status actions feel like a toolbar */
          .adminActions {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .adminActionBtn {
            text-align: center;
            padding: 12px 12px;
          }

          .adminCard {
            padding: 16px;
          }
        }

        @media (max-width: 420px) {
          .adminActions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
