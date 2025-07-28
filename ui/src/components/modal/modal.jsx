import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black/50 animate-slideInFast">
      <div
        className="bg-white rounded-lg shadow-lg  flex-1 mx-8 animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center px-4 py-2 border-b w-full">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
