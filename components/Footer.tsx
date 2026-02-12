import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ marginTop: 0, background: "var(--brown-2)", color: "#f6f0e8" }}>
      <div className="container" style={{ padding: "44px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 30 }}>
          <div>
            <div className="h-serif" style={{ fontSize: 24, fontWeight: 600 }}>Policies Vault</div>
            <p style={{ marginTop: 10, maxWidth: 360, opacity: 0.85, fontSize: 15, lineHeight: 1.7 }}>
              Analysis and commentary on international development institutions and evidence-based policy.
            </p>
          </div>

          <div>
            <div style={{ fontSize: 15, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.75 }}>Quick Links</div>
            <div style={{ marginTop: 12, display: "grid", gap: 10, fontSize: 12, opacity: 0.9 }}>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/publications">Publications</Link>
              {/* <Link href="/research">Research</Link> */}
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 15, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.75 }}>Connect</div>
            <p style={{ marginTop: 12, fontSize: 12, lineHeight: 1.7, opacity: 0.85 }}>
              For collaboration inquiries and research discussions, reach out via the contact form.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 28, borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 18, fontSize: 13, opacity: 0.7, textAlign: "center" }}>
          © {new Date().getFullYear()} Policies Vault

          <div style={{ marginTop: 8, fontSize: 13, opacity: 0.85 }}>
            Policies Vault is an independent policy analysis platform. Gift Nwamadu, MPhil Public Policy, University of Cambridge.
          </div>
        </div>
      </div>
    </footer>
  );
}
