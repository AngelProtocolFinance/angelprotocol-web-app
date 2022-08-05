import { useRef } from "react";
import { useModalContext } from "contexts/ModalContext";
import useAttachKeyPressHandler from "hooks/useAttachKeypressHandler";
import useFocusHandler from "./useFocusHandler";

type Props = {
  classes: string;
  customCloseHandler?: () => void;
};

export default function Backdrop(props: Props) {
  const { classes, customCloseHandler } = props;

  const { closeModal } = useModalContext();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  useFocusHandler(backdropRef);
  useAttachKeyPressHandler("Escape", handleBackdropDismiss);

  function handleBackdropDismiss() {
    if (customCloseHandler) {
      customCloseHandler();
    } else {
      closeModal();
    }
  }

  return (
    <div
      role="alertdialog"
      onClick={handleBackdropDismiss}
      className={classes}
      ref={backdropRef}
    />
  );
}
