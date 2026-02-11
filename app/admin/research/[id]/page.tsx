"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ResearchForm from "@/components/admin/ResearchForm";
import { getResearch, updateResearch } from "@/lib/firebase/adminCrud";

export default function EditResearchPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getResearch(id);
      setItem(data);
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

  return (
    <section className="section">
      <div className="container">
        <div className="adminHeaderRow">
          <h1 className="h-serif adminTitle">Edit Research</h1>

          <button
            className="pill adminBackBtn"
            onClick={() => router.push("/admin/research")}
            type="button"
          >
            Back
          </button>
        </div>

        <ResearchForm
          initial={item}
          onSave={async (payload) => {
            await updateResearch(id, payload);
            const fresh = await getResearch(id);
            setItem(fresh);
          }}
        />
      </div>

      <style jsx>{`
        .adminHeaderRow {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: baseline;
          margin-bottom: 18px;
        }

        .adminTitle {
          font-size: 64px;
          margin: 0;
          line-height: 1.05;
        }

        .adminBackBtn {
          padding: 10px 14px;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .adminTitle {
            font-size: 48px;
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
        }
      `}</style>
    </section>
  );
}
