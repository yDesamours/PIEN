import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  const position = isOpen ? "" : "translate-y-full";

  return createPortal(
    <div
      className={`fixed w-full h-full inset-0 z-50 flex items-center transition-all duration-300 justify-center bg-black/50 ${position}`}
    >
      <div
        className="bg-white h-full rounded-lg shadow-lg  flex-1 flex flex-col justify-end  animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center px-4 py-2 border-b w-full">
          <h2 id="modal-title" className="text-lg font-semibold h-10">
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

        <div className="p-4 flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
}
