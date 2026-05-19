"use client";

import { useState, useRef, useEffect } from "react";
import { ContentFormat, uploadFile } from "@/lib/firebase/adminCrud";
import AdminSelect from "@/components/admin/Select";
import { useToast } from "@/components/ToastProvider";
import { generateAndDownloadPdf } from "@/lib/pdfGenerator";

type PubType = "Article" | "Commentary" | "Brief" | "Analysis";

export default function PublicationForm({
  initial,
  onSave,
}: {
  initial?: any;
  onSave: (payload: any) => Promise<void>;
}) {
  const toast = useToast();
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState<PubType>(initial?.type ?? "Article");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");

  const [status, setStatus] = useState<"draft" | "published">(initial?.status ?? "draft");
  const [contentFormat, setContentFormat] = useState<ContentFormat>(initial?.contentFormat ?? "html");
  const [content, setContent] = useState(initial?.content ?? "");
  const [pdfUrl, setPdfUrl] = useState(initial?.pdfUrl ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl ?? "");

  const [saving, setSaving] = useState(false);

  // Initialize contenteditable with initial content
  useEffect(() => {
    if (contentEditableRef.current && !isInitialized && initial?.content) {
      contentEditableRef.current.innerHTML = initial.content;
      setIsInitialized(true);
    }
  }, [initial?.content, isInitialized]);

  // Insert actual formatting using contenteditable
  const insertFormattingAtCursor = (prefix: string, suffix: string = prefix) => {
    const editor = contentEditableRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString() || "text";

    // Create text node with formatting
    const beforeText = document.createTextNode(prefix);
    const textNode = document.createTextNode(selectedText);
    const afterText = document.createTextNode(suffix);

    range.deleteContents();
    range.insertNode(afterText);
    range.insertNode(textNode);
    range.insertNode(beforeText);

    // Update the state
    if (editor) {
      setContent(editor.innerHTML);
    }

    // Re-focus
    editor.focus();
  };

  const insertFormatting = (command: string, value?: string) => {
    if (contentFormat === "markdown") {
      // For markdown, insert markdown syntax
      switch (command) {
        case "bold":
          insertFormattingAtCursor("**", "**");
          break;
        case "italic":
          insertFormattingAtCursor("*", "*");
          break;
        case "underline":
          insertFormattingAtCursor("__", "__");
          break;
      }
    } else {
      // For HTML, use execCommand
      document.execCommand(command, false, value);
      contentEditableRef.current?.focus();
    }
  };

  const addBold = () => {
    insertFormatting("bold");
  };

  const addItalic = () => {
    insertFormatting("italic");
  };

  const addUnderline = () => {
    insertFormatting("underline");
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const html = (e.currentTarget as HTMLDivElement).innerHTML;
    setContent(html);
  };

  // Generate and download PDF
  const downloadPdf = async () => {
    try {
      await generateAndDownloadPdf({
        title,
        content,
        type,
        status,
        contentFormat,
      });
      toast.success("PDF downloaded!");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to generate PDF");
    }
  };

  async function uploadCover(file: File) {
    const area = status === "published" ? "public" : "private";
    const url = await uploadFile(`${area}/publications/covers/${Date.now()}-${file.name}`, file);
    setCoverImageUrl(url);
  }

  async function uploadPdf(file: File) {
    const area = status === "published" ? "public" : "private";
    const url = await uploadFile(`${area}/publications/pdfs/${Date.now()}-${file.name}`, file);
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
        payload.pdfUrl = pdfUrl || null; // allow attachment too
      }

      if (status === "published" && !initial?.publishedAt) payload.publishedAt = new Date();

      await onSave(payload);

      toast.success(status === "published" ? "Publication published." : "Saved.");
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

        {/* ✅ 2-col on desktop, 1-col on mobile */}
        <div className="adminGrid2">
          <label style={labelStyle}>
            Type
            <AdminSelect
              ariaLabel="Select publication type"
              value={type}
              onChange={(v) => setType(v as PubType)}
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

        {/* ✅ 2-col on desktop, 1-col on mobile */}
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
            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={addBold}
                className="formatBtn"
                title="Add bold text"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                onClick={addItalic}
                className="formatBtn"
                title="Add italic text"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onClick={addUnderline}
                className="formatBtn"
                title="Add underline text"
              >
                <u>U</u>
              </button>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={downloadPdf}
                  style={{
                    padding: "8px 12px",
                    fontSize: "12px",
                    backgroundColor: "rgba(47, 36, 32, 0.08)",
                    border: "1px solid rgba(47, 36, 32, 0.18)",
                    color: "rgba(47, 36, 32, 0.8)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  title="Download as PDF"
                >
                  Download as PDF
                </button>
              </div>
            </div>
            <div
              ref={contentEditableRef}
              contentEditable
              onInput={handleContentChange}
              suppressContentEditableWarning
              style={{
                ...inputStyle,
                minHeight: 240,
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflow: "auto",
              }}
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
          flex-wrap: wrap; /* ✅ prevents overflow */
        }

        .adminFileBtn {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 10px 12px;
          border: 1px solid rgba(47, 36, 32, 0.18);
          cursor: pointer;
          background: white;
          border-radius: 0; /* ✅ no radius */
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

        .formatBtn {
          padding: 8px 12px;
          border: 1px solid rgba(47, 36, 32, 0.18);
          background: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .formatBtn:hover {
          background: #f5f5f5;
          border-color: rgba(47, 36, 32, 0.35);
        }

        .formatBtn:active {
          background: #e8e8e8;
        }

        @media (max-width: 560px) {
          .adminFormCard {
            padding: 16px;
          }
          .adminGrid2 {
            grid-template-columns: 1fr; /* ✅ stack fields */
          }
          .adminSaveBtn {
            width: 100%; /* ✅ nice big tap target */
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
