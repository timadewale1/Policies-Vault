import Link from "next/link";
import PerspectivesCard from "@/components/PerspectivesCard";
import {
  FadeOutOnScroll,
  RevealWhileInView,
  StaggerUpWhileInView,
  StaggerItemUp,
} from "@/components/ScrollMotion";

export default function HomePage() {
  return (
    <>
      {/* HERO (Policies & Commentary fades out while scrolling) */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
         <FadeOutOnScroll start={0} end={300}>
  <h1 className="h-serif heroTitle" style={{ margin: "34px auto 0" }}>
    POLICY &<br />COMMENTARY
  </h1>
</FadeOutOnScroll>
          <p className="heroSub" style={{ margin: "34px auto 18px", color: "var(--muted)", fontWeight: 700 }}>
  Policy analysis and commentary on sustainable development, governance, and institutional effectiveness - examining how international commitments translate to real-world impact
</p>

           <Link className="btn" href="/publications">
              READ PUBLICATIONS <span aria-hidden>→</span>
            </Link>

          <div style={{ height: 34 }} />

          <div className="card" style={{ margin: "0 auto", maxWidth: 1020 }}>
  <div
    className="heroImg"
    style={{
      background:
        "linear-gradient(90deg, rgba(207,217,167,.22), rgba(0,0,0,0)), url('/hero.jpg') center/cover no-repeat",
    }}
  />
</div>
        </div>
      </section>

      <hr className="sep" />

      {/* THE VISION (left fades in from left, right text slides up one after the other) */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <RevealWhileInView from="left">
            <div>
              <div className="kicker">WHY THIS EXISTS</div>

              <h2 className="h-serif sectionTitle" style={{ margin: "12px 0 16px" }}>
  Rigorous Thinking. Real-World Relevance
</h2>


              <div
                style={{
                  width: 68,
                  height: 2,
                  background: "var(--text)",
                  margin: "18px 0 22px",
                }}
              />

              <p
                style={{
                  maxWidth: 520,
                  color: "var(--muted)",
                  lineHeight: 1.85,
                  fontSize: 18,
                }}
              >
                Development policy shapes billions of lives. But the gap between what’s promised in international agreements and what actually happens on the ground is where the real story lives. Policies Vault examines that gap - across climate finance, digital development, ESG governance, and institutional reform
              </p>
            </div>
          </RevealWhileInView>

<div className="visionRight">
            <StaggerUpWhileInView baseDelay={0.12}>
              <StaggerItemUp>
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <div className="kicker">THREE PILLARS</div>
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    <div>
                      <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                        <div className="kicker">01</div>
                        <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                          Evidence Over Rhetoric
                        </div>
                      </div>
                      <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9, fontSize: 16 }}>
                        Analysis that moves beyond headlines and press releases - examining data, governance structures, and implementation mechanisms to understand what’s working and what isn’t.
                      </p>
                    </div>

                    <div>
                      <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                        <div className="kicker">02</div>
                        <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                          Bridging Global and Local
                        </div>
                      </div>
                      <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9, fontSize: 16 }}>
                        International policy commitments mean little if they don’t translate to practice. The focus here is on the disconnect between what gets agreed in conference halls and what reaches the communities policy is meant to serve.
                      </p>
                    </div>

                    <div>
                      <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                        <div className="kicker">03</div>
                        <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                          Independent Analysis
                        </div>
                      </div>
                      <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9, fontSize: 16 }}>
                        Policies Vault is independent. The analysis reflects what evidence suggests - not what institutions want to hear.
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItemUp>
            </StaggerUpWhileInView>
          </div>
        </div>
      </section>

      <hr className="sep" />

      {/* FOCUS AREAS + THE WORK (side by side) */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <RevealWhileInView from="left">
            <div>
              <div className="kicker">FOCUS AREAS</div>
              <h2 className="h-serif sectionTitle" style={{ margin: "12px 0 16px" }}>
                Analysis spanning several interconnected policy domains.
              </h2>

              <StaggerUpWhileInView baseDelay={0.08}>
                <StaggerItemUp>
                  <div>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <div className="kicker">01</div>
                      <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                        Climate Finance & Sustainability
                      </div>
                    </div>
                    <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9 }}>
                      Examining how climate commitments are funded, governed, and implemented - and where the gaps between ambitious pledges and delivery mechanisms emerge.
                    </p>
                  </div>
                </StaggerItemUp>

                <StaggerItemUp>
                  <div>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <div className="kicker">02</div>
                      <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                        Gender & Development
                      </div>
                    </div>
                    <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9 }}>
                      Analyzing how governance frameworks address - or systematically overlook - gender equity across climate adaptation, finance, and institutional design.
                    </p>
                  </div>
                </StaggerItemUp>

                <StaggerItemUp>
                  <div>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <div className="kicker">03</div>
                      <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                        ESG & Digital Technology
                      </div>
                    </div>
                    <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9 }}>
                      Investigating how environmental, social, and governance frameworks intersect with digital innovation - and what this means for development outcomes.
                    </p>
                  </div>
                </StaggerItemUp>

                <StaggerItemUp>
                  <div>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <div className="kicker">04</div>
                      <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                        Global Governance & Institutional Effectiveness
                      </div>
                    </div>
                    <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9 }}>
                      Exploring how international development institutions function, evolve, and where policy interventions succeed or fall short.
                    </p>
                  </div>
                </StaggerItemUp>
              </StaggerUpWhileInView>
            </div>
          </RevealWhileInView>

          <RevealWhileInView from="right">
            <div>
              <div className="kicker">THE WORK</div>
              <h2 className="h-serif sectionTitle" style={{ margin: "12px 0 16px" }}>
                Rigorous enough for researchers. Accessible enough for practitioners.
              </h2>

              <StaggerUpWhileInView baseDelay={0.12}>
                <StaggerItemUp>
                  <div>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <div className="kicker">01</div>
                      <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                        Policy Analysis
                      </div>
                    </div>
                    <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9 }}>
                      In-depth examination of development policies, finance mechanisms, and governance frameworks - grounded in evidence and focused on implementation gaps.
                    </p>
                  </div>
                </StaggerItemUp>

                <StaggerItemUp>
                  <div>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <div className="kicker">02</div>
                      <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                        Commentary
                      </div>
                    </div>
                    <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9 }}>
                      Timely perspectives on current developments in international development, climate policy, and global governance - written to inform and provoke constructive debate.
                    </p>
                  </div>
                </StaggerItemUp>

                <StaggerItemUp>
                  <div>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <div className="kicker">03</div>
                      <div className="h-serif" style={{ fontSize: 22, fontWeight: 700 }}>
                        Research
                      </div>
                    </div>
                    <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.9 }}>
                      Data-driven investigations drawing on quantitative and qualitative methods to examine policy effectiveness and institutional outcomes.
                    </p>
                  </div>
                </StaggerItemUp>
              </StaggerUpWhileInView>
            </div>
          </RevealWhileInView>
        </div>
      </section>

      <hr className="sep" />

      {/* PERSPECTIVES (separate, slides in from bottom) */}
      <PerspectivesCard />

       <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <RevealWhileInView>
           <h1 className="h-serif letsConnectTitle" style={{ margin: "34px auto 0" }}>
  Let&apos;s <br /> Connect
</h1>

            </RevealWhileInView>

          <p
  className="letsConnectSub"
  style={{
    margin: "34px auto 18px",
    color: "var(--muted)",
    fontWeight: 600,
  }}
>
  I&apos;m always interested in discussing research collaborations, policy analysis projects, or speaking opportunities
  related to international development and institutional governance. Whether you&apos;re a fellow researcher, policy maker,
  or simply interested in my work, feel free to reach out. I typically respond within 2-3 business days.
</p>


           <Link className="btn" href="/contact">
              GET IN TOUCH <span aria-hidden>→</span>
            </Link>

          <div style={{ height: 34 }} />

        </div>
      </section>

    </>
  );
}
