import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  closeButtonContents?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeButtonContents,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    console.log("HIDING / ESCAPING");

    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Close on Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root") ?? createModalRoot();

  return createPortal(
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalShadow} onClick={onClose} />
        <div className={styles.modal}>
          {children}
          {closeButtonContents && (
            <button
              onClick={onClose}
              className={styles.closeButton}
              type="button"
            >
              {closeButtonContents}
            </button>
          )}
        </div>
      </div>
    </>,
    modalRoot
  );
};

function createModalRoot() {
  const root = document.createElement("div");
  root.id = "modal-root";
  document.body.appendChild(root);
  return root;
}

export default Modal;
