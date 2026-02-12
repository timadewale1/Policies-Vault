import Link from "next/link";
import { RevealWhileInView, SlideUpOnLoad, StaggerUpWhileInView, StaggerItemUp } from "@/components/ScrollMotion";
import AboutFocusGrid from "@/components/AboutFocusGrid";

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

          {/* tagline removed as requested */}
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
                        Gift Nwamadu
                        <br />
                        <span style={{ fontWeight: 600, fontSize: 18 }}>MPhil Public Policy | University of Cambridge</span>
                      </div>

                      <div style={{ height: 12 }} />

                      <p className="aboutBEText" style={{ marginTop: 8, color: "rgba(47,36,32,.72)" }}>
                        Gift Nwamadu is the researcher and analyst behind Policies Vault. She is currently pursuing an MPhil in Public
                        Policy at the University of Cambridge, where her research focuses on climate finance governance, gender-responsive
                        development policy, and institutional effectiveness.
                      </p>

                      <p className="aboutBEText" style={{ marginTop: 12, color: "rgba(47,36,32,.72)" }}>
                        Gift holds a Bachelor’s degree in International Relations, during which she developed a specialist focus on women,
                        power, and economic agency in Nigeria and Sub-Saharan Africa - examining historical patterns of female economic
                        participation from pre-colonial contexts through to contemporary development frameworks. This foundation shapes
                        her analytical approach: development policy cannot be understood without understanding the historical and gendered
                        structures it operates within.
                      </p>

                      <p className="aboutBEText" style={{ marginTop: 12, color: "rgba(47,36,32,.72)" }}>
                        She created Policies Vault as a space to publish policy analysis and commentary that bridges academic research and
                        practical policy debates - examining implementation gaps across climate finance, gender and development, ESG
                        frameworks, and digital technology. Her work is driven by a simple question: how do international policy commitments
                        actually translate - or fail to translate - into practice?
                      </p>

                      <div style={{ height: 18 }} />
                </div>
              </RevealWhileInView>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH + METHOD (side-by-side, styled like homepage Focus/Work) */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <RevealWhileInView from="left">
            <div>
              <div className="kicker">CURRENT RESEARCH FOCUS</div>
              <h2 className="h-serif sectionTitle" style={{ margin: "12px 0 16px" }}>
                Research themes and geographic focus
              </h2>

              <StaggerUpWhileInView baseDelay={0.06}>
                <StaggerItemUp>
                  <div>
                    <p style={{ marginTop: 4, color: "var(--muted)", lineHeight: 1.9 }}>
                      Current research examines climate change and climate finance for vulnerable communities across Africa - with particular
                      attention to how gender data can inform climate action planning and finance allocation. A central concern is the gap
                      between what climate finance frameworks promise and what actually reaches the communities most exposed to climate impacts.
                      Alongside this, Gift is exploring the intersection of climate finance and digital innovation - examining how technology
                      can strengthen (or complicate) climate governance and the delivery of adaptation finance.
                    </p>
                  </div>
                </StaggerItemUp>
              </StaggerUpWhileInView>
            </div>
          </RevealWhileInView>

          <RevealWhileInView from="right">
            <div>
              <div className="kicker">METHODOLOGICAL APPROACH</div>
              <h2 className="h-serif sectionTitle" style={{ margin: "12px 0 16px" }}>
                Methods and analytic tools
              </h2>

              <StaggerUpWhileInView baseDelay={0.08}>
                <StaggerItemUp>
                  <div>
                    <p style={{ marginTop: 4, color: "var(--muted)", lineHeight: 1.9 }}>
                      Research draws on qualitative policy analysis, institutional mapping, and policy brief writing. Gift is also developing
                      quantitative analytical skills through Stata and R, grounding policy analysis in empirical evidence and data-driven insights.
                    </p>
                  </div>
                </StaggerItemUp>
              </StaggerUpWhileInView>
            </div>
          </RevealWhileInView>
        </div>
      </section>

      {/* CONNECT (match homepage style) */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <RevealWhileInView>
            <h1 className="h-serif letsConnectTitle" style={{ margin: "34px auto 0" }}>
            Connect
            </h1>

          </RevealWhileInView>

          <p
            className="letsConnectSub"
            style={{
              margin: "34px auto 18px",
              color: "var(--muted)",
              fontWeight: 600,
              maxWidth: 820,
            }}
          >
            Gift welcomes connections with researchers, practitioners, think tanks, and international development organizations.
            If something here sparked a thought or you’d like to collaborate, get in touch.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
            <Link className="btn" href="/contact">
              Email <span aria-hidden>→</span>
            </Link>

            <a href="https://www.linkedin.com/in/nwamadu/" target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "12px 16px", border: "1px solid rgba(47,36,32,.18)", textDecoration: "none", color: "inherit", alignSelf: "center" }}>
              LinkedIn
            </a>

            <a href="#" style={{ display: "inline-block", padding: "12px 16px", border: "1px solid rgba(47,36,32,.18)", textDecoration: "none", color: "inherit", alignSelf: "center" }}>
              DOWNLOAD CV
            </a>
          </div>
        </div>
      </section>

      {/* AREAS OF FOCUS */}
      {/* <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <RevealWhileInView from="bottom">
            <h2 className="h-serif aboutFocusTitle" style={{ margin: 0, marginBottom: 35 }}>
              Areas of Focus
            </h2>
          </RevealWhileInView>

          <AboutFocusGrid />
        </div>
      </section> */}

      {/* PROFESSIONAL EXPERIENCE */}
      {/* <section className="sagePanel">
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
      </section> */}
    </>
  );
}
