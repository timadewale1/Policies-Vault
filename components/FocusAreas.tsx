import Link from "next/link";

const cards = [
  {
    title: "Policy\nAnalysis",
    body:
      "In-depth examination of development policies and their real-world implementation outcomes and implications.",
    cta: "GET IN TOUCH",
    href: "/contact",
  },
  {
    title: "Perspectives\non\nGlobal\nGovernance",
    body:
      "Discover recent articles, policy briefs, and commentary pieces examining global issues in international development.",
    cta: "READ PUBLICATIONS",
    href: "/publications",
  },
];

export default function FocusAreas() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24 }}>
          <h2 className="h-serif" style={{ margin: 0, fontSize: 44 }}>Focus Areas</h2>
          <p style={{ margin: 0, maxWidth: 460, color: "var(--muted)", lineHeight: 1.8, fontSize: 18 }}>
            Dedicated to advancing understanding of global development challenges,
            governance, and institutional dynamics.
          </p>
        </div>

        <div style={{ height: 18 }} />
        <hr className="sep" />
        <div style={{ height: 22 }} />

        <div className="grid-2" style={{ gap: 26 }}>
          {/* LEFT CARD */}
          <div className="card" style={{ background: "var(--surface)" }}>
            <div style={{ padding: 28 }}>
              <h3 className="h-serif" style={{ margin: 0, fontSize: 34, whiteSpace: "pre-line" }}>
                {cards[0].title}
              </h3>
              <p style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.8, fontSize: 13, maxWidth: 420 }}>
                {cards[0].body}
              </p>
              <div style={{ height: 14 }} />
              <Link className="btn" href={cards[0].href}>
                {cards[0].cta} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT CARD (sage background + image strip like your video) */}
          <div className="card" style={{ background: "var(--sage)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 280 }}>
              <div style={{ padding: 28 }}>
                <h3 className="h-serif" style={{ margin: 0, fontSize: 34, whiteSpace: "pre-line" }}>
                  {cards[1].title}
                </h3>
                <p style={{ marginTop: 12, color: "rgba(47,36,32,.78)", lineHeight: 1.8, fontSize: 13 }}>
                  {cards[1].body}
                </p>
                <div style={{ height: 14 }} />
                <Link className="btn" href={cards[1].href}>
                  {cards[1].cta} <span aria-hidden>→</span>
                </Link>
              </div>

              {/* Replace with your exact image */}
              <div
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,.08), rgba(0,0,0,0)), url('/focus.jpg') center/cover no-repeat",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
