export default function ContactForm() {
  return (
    <form style={{ display: "grid", gap: 12, maxWidth: 460 }}>
      <label style={{ display: "grid", gap: 6, fontSize: 15 }}>
        Name
        <input style={inputStyle} />
      </label>

      <label style={{ display: "grid", gap: 6, fontSize: 15 }}>
        Email
        <input style={inputStyle} type="email" />
      </label>

      <label style={{ display: "grid", gap: 6, fontSize: 15 }}>
        Subject
        <input style={inputStyle} />
      </label>

      <label style={{ display: "grid", gap: 6, fontSize: 15 }}>
        Message
        <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} />
      </label>

      <button className="btn" type="button">
        SEND MESSAGE <span aria-hidden>→</span>
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  borderRadius: 10,
  border: "1px solid rgba(47,36,32,.18)",
  padding: "10px 12px",
  outline: "none",
  background: "rgba(255,255,255,.35)",
};
