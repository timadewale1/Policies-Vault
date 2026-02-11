"use client";

import { RevealWhileInView } from "@/components/ScrollMotion";
import Link from "next/link";

export default function PerspectivesCard() {
  return (
    <section className="sagePanel">
      <div className="container">
        <div style={{ background: "var(--sage)" }}>
          <div className="perspectivesGrid">
            {/* LEFT TEXT SIDE */}
            <div className="perspectivesLeft">
              <div
                className="kicker"
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  background: "rgba(255,255,255,.22)",
                  marginBottom: 14,
                }}
              >
                LATEST INSIGHTS
              </div>

              <RevealWhileInView from="bottom">
                <h3 className="h-serif perspectivesH3" style={{ margin: 0, fontSize: 72, lineHeight: 0.98 }}>
                  Perspectives<br />on<br />Global<br />Governance
                </h3>
              </RevealWhileInView>

              <p
                style={{
                  marginTop: 18,
                  color: "rgba(47,36,32,.72)",
                  lineHeight: 1.9,
                  fontSize: 18,
                  maxWidth: 600,
                }}
              >
                Discover recent articles, policy briefs,
                <br />
                and commentary pieces examining
                <br />
                critical issues in international
                <br />
                development.
              </p>

              <div style={{ height: 18 }} />

              <Link
                href="/publications"
                className="featuredBox"
                style={{
                  display: "block",
                  maxWidth: 520,
                  background: "rgba(255,255,255,.18)",
                  padding: "18px 18px",
                }}
              >
                <div
                  className="kicker"
                  style={{
                    fontSize: 10,
                    color: "rgba(47,36,32,.68)",
                    marginBottom: 8,
                  }}
                >
                  FEATURED ARTICLE
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div className="h-serif" style={{ fontSize: 25, fontWeight: 600, color: "var(--text)" }}>
                    The Future of Aid Effectiveness
                  </div>
                  <span aria-hidden style={{ fontSize: 20, color: "rgba(47,36,32,.65)" }}>
                    →
                  </span>
                </div>
              </Link>

              <div style={{ height: 18 }} />
              <Link
                href="/publications"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 16,
                  color: "rgba(47,36,32,.78)",
                }}
              >
                View All Publications <span aria-hidden>→</span>
              </Link>
            </div>

            {/* RIGHT IMAGE SIDE */}
            <div className="perspectivesImg" />
          </div>
        </div>
      </div>
    </section>
  );
}
