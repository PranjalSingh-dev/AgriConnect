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
  const cropStyle = getCropColor(crop);
  const color = avatarColor(name);

  return (
    <article
      id={`farmer-card-${name?.replace(/\s+/g, "-").toLowerCase()}`}
      style={{
        background: "#fff",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--gray-100)",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: "4px",
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
        }}
      />

      <div style={{ padding: "24px" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            marginBottom: "18px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${color}, ${color}cc)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.1rem",
              flexShrink: 0,
              boxShadow: `0 4px 12px ${color}44`,
            }}
          >
            {getInitials(name)}
          </div>

          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "var(--gray-800)",
                marginBottom: "4px",
                lineHeight: 1.3,
              }}
            >
              {name || "Unknown Farmer"}
            </h2>
            {/* Rating stars */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "0.75rem",
                    color: star <= (rating || 4) ? "#f59e0b" : "#e5e7eb",
                  }}
                >
                  ★
                </span>
              ))}
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--gray-400)",
                  marginLeft: "2px",
                }}
              >
                ({rating || 4}.0)
              </span>
            </div>
          </div>

          {/* Verified badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "99px",
              padding: "3px 10px",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#15803d",
              flexShrink: 0,
            }}
          >
            ✓ Verified
          </div>
        </div>

        {/* Info rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          {/* Crop badge */}
          {crop && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "var(--green-50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}
              >
                🌾
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: cropStyle.bg,
                  color: cropStyle.text,
                  border: `1px solid ${cropStyle.border}`,
                  borderRadius: "99px",
                  padding: "3px 12px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {crop}
              </span>
            </div>
          )}

          {/* Village */}
          {village && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--gray-500)",
                fontSize: "0.875rem",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "var(--gray-50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}
              >
                📍
              </span>
              <span>{village}</span>
            </div>
          )}

          {/* Phone */}
          {phone && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--gray-500)",
                fontSize: "0.875rem",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "var(--gray-50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}
              >
                📞
              </span>
              <span>{phone}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          style={{
            width: "100%",
            padding: "11px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: "none",
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
          Contact Farmer
        </button>
      </div>
    </article>
  );
}

export default Card;