import { FC, PropsWithChildren } from "react";
import styles from "./Modal.module.css";

interface IModal {
  active: boolean;

  onClose(): void;
}

const Modal: FC<PropsWithChildren<IModal>> = ({
  active,
  onClose,
  children,
}) => {
  return active ? (
    <div
      className={`${styles.modal} ${active && styles.modalActive}`}
      onClick={onClose}
      data-testid="close"
    >
      <div
        className={`${styles.modalContent} ${active && styles.modalContentActive}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};
export default Modal;
