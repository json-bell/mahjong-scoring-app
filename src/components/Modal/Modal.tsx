import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { useEffect } from "react";
import { cx } from "../../utils/classNames";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  belowButtons?: {
    contents: React.ReactNode;
    onClick: () => void;
    id: string;
    buttonStyle?: "primary" | "secondary" | "secondaryOutline";
  }[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  belowButtons,
}) => {
  useEffect(() => {
    if (!isOpen) return;

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
        <div className={styles.modal} role="dialog">
          {children}
        </div>
        <div className={styles.modalButtons}>
          {belowButtons?.map(
            ({ contents, onClick, id, buttonStyle = "secondary" }) => {
              return (
                <button
                  key={id}
                  onClick={onClick}
                  className={cx(
                    styles[`${buttonStyle}Button`],
                    styles.modalButton
                  )}
                  type="button"
                >
                  {contents}
                </button>
              );
            }
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
