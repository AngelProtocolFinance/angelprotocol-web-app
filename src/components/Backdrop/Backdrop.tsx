import { useModalContext } from "contexts/ModalContext";
import { useRef } from "react";
import useAttachKeyPressHandler from "hooks/useAttachKeypressHandler";
import { useFocusHandler } from "./useFocusHandler";

export default function Backdrop(props: {
  classes: string;
  customCloseHandler?: () => void;
}) {
  const { closeModal } = useModalContext();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  useFocusHandler(backdropRef);
  useAttachKeyPressHandler("Escape", handleBackdropDismiss);

  function handleBackdropDismiss() {
    if (props.customCloseHandler) {
      props.customCloseHandler();
    } else {
      closeModal();
    }
  }

  return (
    <div
      role="alertdialog"
      onClick={handleBackdropDismiss}
      className={props.classes}
      ref={backdropRef}
    />
  );
}
