"use client";

import React, { useState } from "react";
import { RevealWhileInView, SlideUpOnLoad } from "@/components/ScrollMotion";
import { sendContactMessage } from "@/lib/firebase/messages";
import { useToast } from "@/components/ToastProvider";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const toast = useToast();
  const [errors, setErrors] = useState<{ [k: string]: boolean }>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const missing: string[] = [];
    if (!name) missing.push("Name");
    if (!email) missing.push("Email");
    if (!subject) missing.push("Subject");
    if (!message) missing.push("Message");
    if (missing.length > 0) {
      const map: { [k: string]: boolean } = {};
      if (!name) map["name"] = true;
      if (!email) map["email"] = true;
      if (!subject) map["subject"] = true;
      if (!message) map["message"] = true;
      setErrors(map);
      toast.error(`Please fill: ${missing.join(", ")}`);
      return;
    }

    try {
      setStatus("sending");
      await sendContactMessage({ name, email, subject, message });
      setStatus("sent");
      toast.success("Message sent.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
      toast.error("Failed to send message.");
    }
  }

  return (
    <>
      {/* HEADER */}
      <section className="section" style={{ paddingBottom: 54 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <SlideUpOnLoad>
            <h1 className="h-serif contactTitle" style={{ margin: "10px 0 10px" }}>
              Get in Touch
            </h1>
          </SlideUpOnLoad>

          <SlideUpOnLoad delay={0.08}>
            <p
              className="contactSub"
              style={{
                margin: "0 auto",
                color: "var(--muted)",
                lineHeight: 1.85,
              }}
            >
              Interested in collaboration, have questions about my work, or want to discuss
              <br />
              research opportunities? I’d be happy to connect.
            </p>
          </SlideUpOnLoad>
        </div>
      </section>

      {/* SAGE SECTION */}
      <section className="sagePanel" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contactSageWrap" style={{ background: "var(--sage)" }}>
            <div className="contactGrid">
              {/* LEFT: FORM */}
              <RevealWhileInView from="left">
                <div className="contactFormCard">
                  <div className="h-serif" style={{ fontSize: 38, fontWeight: 700 }}>
                    Send a Message
                  </div>

                  <div style={{ height: 18 }} />

                  <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
                    <Field label="Name" placeholder="Your name" value={name} onChange={(v) => { setName(v); setErrors((s) => ({ ...s, name: false })); }} error={!!errors.name} />
                    <Field label="Email" placeholder="your.email@example.com" type="email" value={email} onChange={(v) => { setEmail(v); setErrors((s) => ({ ...s, email: false })); }} error={!!errors.email} />
                    <Field label="Subject" placeholder="What would you like to discuss?" value={subject} onChange={(v) => { setSubject(v); setErrors((s) => ({ ...s, subject: false })); }} error={!!errors.subject} />
                    <Field label="Message" placeholder="Your message..." as="textarea" value={message} onChange={(v) => { setMessage(v); setErrors((s) => ({ ...s, message: false })); }} error={!!errors.message} />

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      style={{
                        border: "1px solid rgba(47,36,32,.35)",
                        background: "transparent",
                        padding: "12px 16px",
                        cursor: status === "sending" ? "not-allowed" : "pointer",
                        fontSize: 18,
                        color: "rgba(47,36,32,.8)",
                        opacity: status === "sending" ? 0.6 : 1,
                      }}
                    >
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </button>

                    {status === "sent" ? (
                      <p style={{ margin: 0, fontSize: 18, color: "rgba(47,36,32,.75)" }}>
                        Message sent successfully.
                      </p>
                    ) : status === "error" ? (
                      <p style={{ margin: 0, fontSize: 18, color: "rgba(47,36,32,.75)" }}>
                        Something went wrong. Please try again.
                      </p>
                    ) : null}
                  </form>
                </div>
              </RevealWhileInView>

              {/* RIGHT */}
              <RevealWhileInView from="right">
                <div style={{ paddingTop: 6 }}>
                  <div className="h-serif contactRightTitle" style={{ fontWeight: 700 }}>
                    Let&apos;s Connect
                  </div>

                  <p style={rightP}>
                    I&apos;m always interested in discussing research collaborations, policy analysis projects,
                    or speaking opportunities related to international development and institutional governance.
                  </p>

                  <p style={rightP}>
                    Whether you&apos;re a fellow researcher, policy maker, or simply interested in my work,
                    feel free to reach out. I typically respond within 2-3 business days.
                  </p>

                  <div style={{ height: 14 }} />
                  <div className="h-serif" style={{ fontSize: 28, fontWeight: 700 }}>
                    Areas of Interest
                  </div>

                  <ul
                    style={{
                      marginTop: 12,
                      paddingLeft: 16,
                      color: "rgba(47,36,32,.75)",
                      lineHeight: 1.9,
                      fontSize: 18,
                    }}
                  >
                    <li>Research collaborations</li>
                    <li>Speaking engagements</li>
                    <li>Policy consultations</li>
                    <li>Media inquiries</li>
                    <li>Academic partnerships</li>
                  </ul>

                  <div style={{ height: 22 }} />

                  <RevealWhileInView from="bottom">
                    <div
                      className="contactImg"
                      style={{
                        background: "url('/contact.jpg') center/cover no-repeat",
                        border: "1px solid rgba(47,36,32,.12)",
                      }}
                    />
                  </RevealWhileInView>
                </div>
              </RevealWhileInView>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const rightP: React.CSSProperties = {
  marginTop: 12,
  color: "rgba(47,36,32,.72)",
  lineHeight: 1.9,
  fontSize: 18,
  maxWidth: 520,
};

function Field({
  label,
  placeholder,
  type = "text",
  as,
  value,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  type?: string;
  as?: "textarea";
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  const common: React.CSSProperties = {
    border: "1px solid rgba(47,36,32,.28)",
    padding: "12px 12px",
    background: "transparent",
    outline: "none",
    width: "100%",
    fontSize: 13,
    color: "rgba(47,36,32,.8)",
  };

  const labelStyle: React.CSSProperties = { display: "grid", gap: 8, color: "rgba(47,36,32,.78)", fontSize: 13 };
  const errStyle = { border: "1px solid #dc2626" } as React.CSSProperties;

  return (
    <label style={labelStyle}>
      {label}
      {as === "textarea" ? (
        <textarea
          style={{ ...common, minHeight: 140, resize: "none", ...(error ? errStyle : {}) }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          style={{ ...common, ...(error ? errStyle : {}) }}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
