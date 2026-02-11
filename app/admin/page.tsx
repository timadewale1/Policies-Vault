"use client";

import { useEffect, useState } from "react";
import {
  listAdminPublications,
  listAdminResearch,
  listAdminMessages,
} from "@/lib/firebase/adminCrud";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ pubs: 0, research: 0, messages: 0 });

  useEffect(() => {
    (async () => {
      const [p, r, m] = await Promise.all([
        listAdminPublications(),
        listAdminResearch(),
        listAdminMessages(),
      ]);
      setCounts({ pubs: p.length, research: r.length, messages: m.length });
    })();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="h-serif adminTitle">Dashboard</h1>

        <div className="adminStatsGrid">
          <Stat label="Publications" value={counts.pubs} />
          <Stat label="Research" value={counts.research} />
          <Stat label="Messages" value={counts.messages} />
        </div>

        <p className="adminHint">
          Use the top navigation to manage content and view contact messages.
        </p>
      </div>

      {/* ✅ local responsive styles */}
      <style jsx>{`
        .adminTitle {
          font-size: 64px;
          margin: 0 0 18px;
          line-height: 1.05;
        }

        .adminStatsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .adminHint {
          margin-top: 22px;
          color: var(--muted);
          line-height: 1.8;
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .adminTitle {
            font-size: 48px;
          }
          .adminStatsGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .adminTitle {
            font-size: 38px;
          }
          .adminStatsGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card adminStatCard">
      <div className="kicker">{label}</div>
      <div className="h-serif adminStatValue">{value}</div>

      <style jsx>{`
        .adminStatCard {
          padding: 18px;
          background: var(--sage);
          border-radius: 0; /* keep your style */
        }

        .adminStatValue {
          font-size: 44px;
          font-weight: 700;
          margin-top: 8px;
          line-height: 1;
        }

        @media (max-width: 900px) {
          .adminStatCard {
            padding: 16px;
          }
          .adminStatValue {
            font-size: 40px;
          }
        }

        @media (max-width: 560px) {
          .adminStatCard {
            padding: 16px;
          }
          .adminStatValue {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
}
