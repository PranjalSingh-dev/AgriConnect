/**
 * Props:
 * size - loader size
 */

function Loader({ size = "40px" }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: "4px solid #ddd",
        borderTop: "4px solid green",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );
}

export default Loader;