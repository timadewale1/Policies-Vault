"use client";

import { useRouter } from "next/navigation";
import ResearchForm from "@/components/admin/ResearchForm";
import { createResearch } from "@/lib/firebase/adminCrud";

export default function NewResearchPage() {
  const router = useRouter();

  return (
    <section className="section">
      <div className="container">
        <h1 className="h-serif adminTitle">New Research</h1>

        <ResearchForm
          onSave={async (payload) => {
            const id = await createResearch(payload);
            router.replace(`/admin/research/${id}`);
          }}
        />
      </div>

      <style jsx>{`
        .adminTitle {
          font-size: 64px;
          margin: 0 0 18px;
          line-height: 1.05;
        }

        @media (max-width: 900px) {
          .adminTitle {
            font-size: 48px;
          }
        }

        @media (max-width: 560px) {
          .adminTitle {
            font-size: 38px;
          }
        }
      `}</style>
    </section>
  );
}
