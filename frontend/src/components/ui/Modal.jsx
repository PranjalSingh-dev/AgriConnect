/**
 * Props:
 * isOpen - show/hide modal
 * onClose - close handler
 * children - content
 */

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        {children}
        <button
          onClick={onClose}
          className="mt-3 px-3 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;