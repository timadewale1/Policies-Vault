import AboutFocusGrid from "@/components/AboutFocusGrid";
import { RevealWhileInView, SlideUpOnLoad } from "@/components/ScrollMotion";

export default function AboutPage() {
  return (
    <>
      {/* ABOUT HEADER */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <SlideUpOnLoad>
            <h1 className="h-serif aboutTitle" style={{ margin: "20px 0 10px" }}>
              About
            </h1>
          </SlideUpOnLoad>

          <SlideUpOnLoad delay={0.08}>
            <p
              className="aboutSub"
              style={{
                margin: "0 auto",
                color: "var(--muted)",
                lineHeight: 1.85,
              }}
            >
              A dedicated policy analyst and researcher focused on international
              development institutions, governance, and institutional effectiveness.
            </p>
          </SlideUpOnLoad>
        </div>
      </section>

      {/* BACKGROUND & EXPERTISE */}
      <section className="sagePanel">
        <div className="container">
          <div className="aboutBEWrap" style={{ background: "var(--sage)" }}>
            <div className="aboutBEGrid">
              <RevealWhileInView from="left">
                <div
                  className="aboutBEImg"
                  style={{
                    background: "url('/about.jpg') center/cover no-repeat",
                    border: "1px solid rgba(47,36,32,.12)",
                  }}
                />
              </RevealWhileInView>

              <RevealWhileInView from="right">
                <div style={{ padding: 6 }}>
                  <div className="h-serif aboutBETitle" style={{ fontWeight: 800 }}>
                    Background &<br />Expertise
                  </div>

                  <p className="aboutBEText" style={{ marginTop: 16, color: "rgba(47,36,32,.72)" }}>
                    My work centers on examining the effectiveness and impact of international development institutions,
                    with a particular focus on policy analysis, institutional governance, and development outcomes.
                  </p>

                  <p className="aboutBEText" style={{ marginTop: 12, color: "rgba(47,36,32,.72)" }}>
                    Through rigorous research and thoughtful commentary, I explore how these institutions can better serve
                    their missions and the communities they aim to support.
                  </p>

                  <p className="aboutBEText" style={{ marginTop: 12, color: "rgba(47,36,32,.72)" }}>
                    My approach combines empirical analysis with practical insights, drawing from both academic research and
                    real-world policy implementation.
                  </p>
                </div>
              </RevealWhileInView>
            </div>
          </div>
        </div>
      </section>

      {/* AREAS OF FOCUS */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <RevealWhileInView from="bottom">
            <h2 className="h-serif aboutFocusTitle" style={{ margin: 0, marginBottom: 35 }}>
              Areas of Focus
            </h2>
          </RevealWhileInView>

          <AboutFocusGrid />
        </div>
      </section>

      {/* PROFESSIONAL EXPERIENCE */}
      <section className="sagePanel">
        <div className="container">
          <RevealWhileInView from="bottom">
            <div className="aboutExpPanel" style={{ background: "var(--sage)" }}>
              <div>
                <h2 className="h-serif aboutExpTitle" style={{ margin: 0 }}>
                  Professional Experience
                </h2>
                <p className="aboutExpSub" style={{ marginTop: 25, color: "rgba(47,36,32,.68)" }}>
                  Experience information coming soon.
                </p>
              </div>
            </div>
          </RevealWhileInView>
        </div>
      </section>
    </>
  );
}
