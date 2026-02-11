"use client";

import { useState } from "react";
import { ContentFormat, uploadFile } from "@/lib/firebase/adminCrud";
import AdminSelect from "@/components/admin/Select";
import { useToast } from "@/components/ToastProvider";

type ResearchType = "Article" | "Commentary" | "Brief" | "Analysis";

export default function ResearchForm({
  initial,
  onSave,
}: {
  initial?: any;
  onSave: (payload: any) => Promise<void>;
}) {
  const toast = useToast();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState<ResearchType>(initial?.type ?? "Article");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");

  const [status, setStatus] = useState<"draft" | "published">(initial?.status ?? "draft");
  const [contentFormat, setContentFormat] = useState<ContentFormat>(initial?.contentFormat ?? "markdown");
  const [content, setContent] = useState(initial?.content ?? "");
  const [pdfUrl, setPdfUrl] = useState(initial?.pdfUrl ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl ?? "");

  const [saving, setSaving] = useState(false);

  async function uploadCover(file: File) {
    const area = status === "published" ? "public" : "private";
    const url = await uploadFile(`${area}/research/covers/${Date.now()}-${file.name}`, file);
    setCoverImageUrl(url);
  }

  async function uploadPdf(file: File) {
    const area = status === "published" ? "public" : "private";
    const url = await uploadFile(`${area}/research/pdfs/${Date.now()}-${file.name}`, file);
    setPdfUrl(url);
  }

  async function submit() {
    setSaving(true);
    try {
      const payload: any = {
        title,
        type,
        excerpt,
        status,
        contentFormat,
        coverImageUrl: coverImageUrl || null,
      };

      if (contentFormat === "pdf") {
        payload.pdfUrl = pdfUrl || null;
        payload.content = null;
      } else {
        payload.content = content || "";
        payload.pdfUrl = pdfUrl || null;
      }

      if (status === "published" && !initial?.publishedAt) payload.publishedAt = new Date();

      await onSave(payload);

      toast.success(status === "published" ? "Research published." : "Saved.");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save.");
      throw err;
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card adminFormCard">
      <div className="adminFormStack">
        <label style={labelStyle}>
          Title
          <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <div className="adminGrid2">
          <label style={labelStyle}>
            Type
            <AdminSelect
              ariaLabel="Select research type"
              value={type}
              onChange={(v) => setType(v as ResearchType)}
              options={["Article", "Commentary", "Brief", "Analysis"]}
            />
          </label>

          <label style={labelStyle}>
            Status
            <AdminSelect
              ariaLabel="Select status"
              value={status}
              onChange={(v) => setStatus(v as any)}
              options={["draft", "published"]}
            />
          </label>
        </div>

        <label style={labelStyle}>
          Excerpt (optional)
          <textarea
            style={{ ...inputStyle, minHeight: 90 }}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </label>

        <div className="adminGrid2">
          <label style={labelStyle}>
            Body format
            <AdminSelect
              ariaLabel="Select body format"
              value={contentFormat}
              onChange={(v) => setContentFormat(v as any)}
              options={["markdown", "html", "pdf"]}
            />
          </label>

          <label style={labelStyle}>
            Cover image (optional)
            <div className="adminUploadRow">
              <label className="adminFileBtn">
                Choose file
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
                  className="adminFileInput"
                />
              </label>
              {coverImageUrl ? <span style={hintStyle}>Uploaded ✓</span> : <span style={hintStyle}>—</span>}
            </div>
          </label>
        </div>

        <label style={labelStyle}>
          PDF (optional)
          <div className="adminUploadRow">
            <label className="adminFileBtn">
              Choose file
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => e.target.files?.[0] && uploadPdf(e.target.files[0])}
                className="adminFileInput"
              />
            </label>
            {pdfUrl ? <span style={hintStyle}>Uploaded ✓</span> : <span style={hintStyle}>—</span>}
          </div>
        </label>

        {contentFormat !== "pdf" ? (
          <label style={labelStyle}>
            Body ({contentFormat})
            <textarea
              style={{ ...inputStyle, minHeight: 240 }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={contentFormat === "markdown" ? "# Title\n\nWrite markdown…" : "<p>Write HTML…</p>"}
            />
          </label>
        ) : (
          <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.8 }}>
            PDF format selected. Upload a PDF above. (You can still keep excerpt for preview.)
          </p>
        )}

        <button className="btn adminSaveBtn" onClick={submit} disabled={saving} type="button">
          {saving ? "SAVING..." : "SAVE"} <span aria-hidden="true">→</span>
        </button>
      </div>

      <style jsx>{`
        .adminFormCard {
          padding: 18px;
          border-radius: 0;
        }

        .adminFormStack {
          display: grid;
          gap: 12px;
        }

        .adminGrid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .adminUploadRow {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .adminFileBtn {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 10px 12px;
          border: 1px solid rgba(47, 36, 32, 0.18);
          cursor: pointer;
          background: white;
          border-radius: 0;
        }

        .adminFileInput {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .adminSaveBtn {
          justify-content: center;
          width: fit-content;
        }

        @media (max-width: 560px) {
          .adminFormCard {
            padding: 16px;
          }
          .adminGrid2 {
            grid-template-columns: 1fr;
          }
          .adminSaveBtn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
  color: "var(--muted)",
  fontSize: 13,
};

const inputStyle: React.CSSProperties = {
  border: "1px solid rgba(47,36,32,.28)",
  padding: "12px 12px",
  background: "transparent",
  outline: "none",
  width: "100%",
  fontSize: 13,
  color: "rgba(47,36,32,.8)",
};

const hintStyle: React.CSSProperties = { fontSize: 12, color: "rgba(47,36,32,.65)" };
