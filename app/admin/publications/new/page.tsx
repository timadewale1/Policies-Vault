"use client";

import { useRouter } from "next/navigation";
import PublicationForm from "@/components/admin/PublicationForm";
import { createPublication } from "@/lib/firebase/adminCrud";

export default function NewPublicationPage() {
  const router = useRouter();

  return (
    <section className="section">
      <div className="container">
        <h1 className="h-serif adminTitle">New Publication</h1>

        <PublicationForm
          onSave={async (payload) => {
            const id = await createPublication(payload);
            router.replace(`/admin/publications/${id}`);
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
