/**
 * Props:
 * size - loader size (default "40px")
 * color - spinner accent color (default green)
 */
function Loader({ size = "40px", color = "#16a34a" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        width: size,
        height: size,
        border: `3px solid rgba(22,163,74,0.12)`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.8s cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite",
        flexShrink: 0,
      }}
    />
  );
}

export default Loader;