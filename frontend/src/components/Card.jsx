import { useState } from "react";

const cropColors = {
  default: { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  wheat:   { bg: "#fefce8", text: "#a16207", border: "#fef08a" },
  rice:    { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  cotton:  { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  maize:   { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  vegetables: { bg: "#f0fdf4", text: "#15803d", border: "#86efac" },
};

function getCropColor(crop) {
  if (!crop) return cropColors.default;
  const lower = crop.toLowerCase();
  for (const key of Object.keys(cropColors)) {
    if (lower.includes(key)) return cropColors[key];
  }
  return cropColors.default;
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function avatarColor(name) {
  const colors = [
    "#16a34a", "#15803d", "#0d9488", "#0284c7",
    "#7c3aed", "#c2410c", "#db2777", "#d97706",
  ];
  if (!name) return colors[0];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

function Card({ name, crop, village, phone, rating }) {
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const cropStyle = getCropColor(crop);
  const color = avatarColor(name);

  const displayPhone = phone && phone.trim() ? phone : "+91 98765 43210";
  const cleanDigits = displayPhone.replace(/\D/g, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(displayPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <article
        id={`farmer-card-${name?.replace(/\s+/g, "-").toLowerCase()}`}
        style={{
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Card Header with Crop Tag */}
        <div
          style={{
            padding: "20px 24px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              background: cropStyle.bg,
              color: cropStyle.text,
              border: `1px solid ${cropStyle.border}`,
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            🌾 {crop || "Produce"}
          </span>
          <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
            ⭐ {rating || "5.0"}
          </span>
        </div>

        {/* Farmer Info */}
        <div style={{ padding: "0 24px 20px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.1rem",
                flexShrink: 0,
              }}
            >
              {getInitials(name)}
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {name}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "2px 0 0" }}>
                📍 {village || "Local Farm"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={{ padding: "0 24px 20px" }}>
          <button
            onClick={() => setShowContact(true)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(22,163,74,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(22,163,74,0.25)";
            }}
          >
            📞 Contact Farmer
          </button>
        </div>
      </article>

      {/* Contact Modal */}
      {showContact && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowContact(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowContact(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                border: "none",
                background: "#f1f5f9",
                borderRadius: "50%",
                width: 32,
                height: 32,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              ✕
            </button>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                margin: "0 auto 16px",
                background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.5rem",
                fontWeight: 800,
              }}
            >
              {getInitials(name)}
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 4px" }}>{name}</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 20px" }}>
              🌾 {crop} Farmer • 📍 {village}
            </p>

            <div
              style={{
                background: "#f8fafc",
                padding: "16px",
                borderRadius: "16px",
                marginBottom: "20px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Phone Number
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginTop: 4,
                  letterSpacing: "0.5px",
                }}
              >
                {displayPhone}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                {/* Call Now */}
                <a
                  href={`tel:${cleanDigits}`}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    background: "#16a34a",
                    color: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  📞 Call Now
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={`https://wa.me/${cleanDigits}?text=Hi%20${encodeURIComponent(name)},%20I%20saw%20your%20${encodeURIComponent(crop)}%20listing%20on%20AgriConnect.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  💬 WhatsApp
                </a>
              </div>

              {/* Copy Phone Number */}
              <button
                onClick={handleCopy}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  background: copied ? "#22c55e" : "#f1f5f9",
                  color: copied ? "#fff" : "#334155",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {copied ? "✓ Copied to Clipboard!" : "📋 Copy Phone Number"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;