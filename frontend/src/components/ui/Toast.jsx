/**
 * Props:
 * message - toast text
 * type    - "success" (default) | "error" | "info"
 */
function Toast({ message, type = "success" }) {
  const styles = {
    success: { background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "#fff" },
    error:   { background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff" },
    info:    { background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", color: "#fff" },
  };

  const style = styles[type] || styles.success;

  return (
    <div
      role="alert"
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        padding: "14px 22px",
        borderRadius: "12px",
        fontWeight: 600,
        fontSize: "0.95rem",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        animation: "fadeInRight 0.35s ease",
        maxWidth: "360px",
        ...style,
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>
        {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
      </span>
      {message}
      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
      `}</style>
    </div>
  );
}

export default Toast;