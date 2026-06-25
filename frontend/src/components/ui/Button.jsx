/**
 * Props:
 * text - button text
 * onClick - click handler
 */

function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      {text}
    </button>
  );
}

export default Button;