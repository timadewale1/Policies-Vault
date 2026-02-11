"use client";

import { RevealWhileInView } from "@/components/ScrollMotion";

const items = [
  {
    no: "01",
    title: "Policy\nAnalysis",
    desc:
      "In-depth examination of development policies and their real-world impact on communities and institutions.",
  },
  {
    no: "02",
    title: "Commentary",
    desc:
      "Thoughtful perspectives on current events and trends in international development and governance.",
  },
  {
    no: "03",
    title: "Research",
    desc:
      "Data-driven investigations and analytical frameworks focused on institutional effectiveness and policy outcomes.",
  },
];

export default function FocusAreasList() {
  return (
    <section className="section">
      <div className="container">
        <div className="focusHeader">
          <h2 className="h-serif" style={{ margin: 0, fontSize: 64 }}>
            Focus Areas
          </h2>
          <p style={{ margin: 0, maxWidth: 420, color: "var(--muted)", lineHeight: 1.8, fontSize: 18 }}>
            Dedicated to advancing understanding of global development challenges.
          </p>
        </div>

        <div style={{ height: 22 }} />
        <hr className="sep" />

        <div style={{ marginTop: 10 }}>
          {items.map((it, idx) => (
            <div key={it.no}>
              <div className="focusRow">
                <div className="kicker" style={{ fontSize: 15 }}>
                  {it.no}
                </div>

                <RevealWhileInView from="left" delay={0.02 * idx}>
                  <div
                    className="h-serif focusTitle"
                    style={{
                      fontSize: 52,
                      fontWeight: 600,
                      whiteSpace: "pre-line",
                      lineHeight: 1.02,
                    }}
                  >
                    {it.title}
                  </div>
                </RevealWhileInView>

                <RevealWhileInView from="bottom" delay={0.08 + 0.05 * idx}>
                  <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.85, fontSize: 18, maxWidth: 520 }}>
                    {it.desc}
                  </p>
                </RevealWhileInView>
              </div>

              {idx < items.length - 1 && <hr className="sep" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
