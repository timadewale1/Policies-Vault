"use client";

import { useState } from "react";
import { signInEmail, signInGoogle, signUpEmail } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function onEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    try {
      if (mode === "signin") await signInEmail(email, password);
      else await signUpEmail(email, password);
      router.replace("/admin");
    } catch (err: any) {
      setStatus(err?.message ?? "Auth failed");
    }
  }

  async function onGoogle() {
    setStatus(null);
    try {
      await signInGoogle();
      router.replace("/admin");
    } catch (err: any) {
      setStatus(err?.message ?? "Google sign-in failed");
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 520 }}>
        <h1 className="h-serif" style={{ fontSize: 60, margin: "0 0 12px" }}>
          Admin Login
        </h1>
        <p style={{ margin: "0 0 20px", color: "var(--muted)", lineHeight: 1.8 }}>
          Sign in to manage publications, research, and contact messages.
        </p>

        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <button className={`pill ${mode === "signin" ? "pillActive" : ""}`} onClick={() => setMode("signin")}>
            Sign In
          </button>
          <button className={`pill ${mode === "signup" ? "pillActive" : ""}`} onClick={() => setMode("signup")}>
            Sign Up
          </button>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <form onSubmit={onEmailAuth} style={{ display: "grid", gap: 12 }}>
            <label style={{ display: "grid", gap: 8, color: "var(--muted)", fontSize: 13 }}>
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                type="email"
                required
              />
            </label>

            <label style={{ display: "grid", gap: 8, color: "var(--muted)", fontSize: 13 }}>
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                type="password"
                required
              />
            </label>

            <button className="btn" type="submit" style={{ justifyContent: "center" }}>
              {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"} <span aria-hidden>→</span>
            </button>

            <button
              type="button"
              onClick={onGoogle}
              style={{
                border: "1px solid var(--border)",
                background: "transparent",
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Continue with Google →
            </button>

            {status ? <p style={{ margin: 0, color: "rgba(47,36,32,.75)", fontSize: 13 }}>{status}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  border: "1px solid rgba(47,36,32,.28)",
  padding: "12px 12px",
  background: "transparent",
  outline: "none",
  width: "100%",
  fontSize: 13,
  color: "rgba(47,36,32,.8)",
};
