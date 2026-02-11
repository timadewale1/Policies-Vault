import Link from "next/link";
import FocusAreasList from "@/components/FocusAreasList";
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
  Exploring international development institutions and governance through rigorous analysis, thoughtful commentary,
  and evidence-based research.
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
              <div className="kicker">THE VISION</div>

              <h2 className="h-serif sectionTitle" style={{ margin: "12px 0 16px" }}>
  Rigorous<br />Inquiry,<br />Global<br />Impact.
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
                  maxWidth: 400,
                  color: "var(--muted)",
                  lineHeight: 1.85,
                  fontSize: 18,
                }}
              >
                Navigating the complexities of international development requires clarity,
                evidence, and institutional understanding.
              </p>
            </div>
          </RevealWhileInView>

<div className="visionRight">
            <StaggerUpWhileInView baseDelay={0.12}>
              <StaggerItemUp>
                <div>
                  <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                    <div className="kicker">01</div>
                    <div className="h-serif" style={{ fontSize: 32, fontWeight: 600 }}>
                      Institutional Analysis
                    </div>
                  </div>
                  <p style={{ marginTop: 10, color: "var(--muted)", lineHeight: 1.9, fontSize: 18 }}>
                    We delve deep into the machinery of development organizations, understanding not just
                    what they do, but how they function, evolve, and interact with the world.
                  </p>
                </div>
              </StaggerItemUp>

              <StaggerItemUp>
                <div style={{ marginTop: 18 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                    <div className="kicker">02</div>
                    <div className="h-serif" style={{ fontSize: 32, fontWeight: 600 }}>
                      Evidence-Based Policy
                    </div>
                  </div>
                  <p style={{ marginTop: 10, color: "var(--muted)", lineHeight: 1.9, fontSize: 18 }}>
                    Moving beyond rhetoric, our work is grounded in empirical research, data-driven insights,
                    and practical policy recommendations.
                  </p>
                </div>
              </StaggerItemUp>
              <StaggerItemUp>
                <div style={{ marginTop: 18 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                    <div className="kicker">03</div>
                    <div className="h-serif" style={{ fontSize: 32, fontWeight: 600 }}>
                      Global Perspective
                    </div>
                  </div>
                  <p style={{ marginTop: 10, color: "var(--muted)", lineHeight: 1.9, fontSize: 18  }}>
                    With a focus that spans continents, we bring a comparative perspective to development challenges, identifying universal patterns while respecting local nuances.
                  </p>
                </div>
              </StaggerItemUp>
            </StaggerUpWhileInView>
          </div>
        </div>
      </section>

      <hr className="sep" />

      {/* FOCUS AREAS (separate section, 3 items, like your screenshot) */}
      <FocusAreasList />

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
    fontWeight: 700,
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
