import { Modal } from "@material-ui/core";
import "../../../css/modals/modal.scss";

export default function ModalRoot({
  open,
  onClose,
  className,
  children,
  ...rest
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={`modal-root ${className && className}`}
    >
      <div {...rest}>{children}</div>
    </Modal>
  );
}
