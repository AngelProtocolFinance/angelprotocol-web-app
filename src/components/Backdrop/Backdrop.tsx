import { useRef } from "react";
import { useModalContext } from "contexts/ModalContext";
import useAttachKeyPressHandler from "hooks/useAttachKeypressHandler";
import useFocusHandler from "./useFocusHandler";

type Props = {
  classes: string;
  customCloseHandler?: () => void;
  canBeClosed?: boolean;
};

export default function Backdrop(props: Props) {
  const { classes, customCloseHandler, canBeClosed = true } = props;

  const { closeModal } = useModalContext();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  useFocusHandler(backdropRef);
  useAttachKeyPressHandler("Escape", handleBackdropDismiss);

  console.log("backdrop", canBeClosed);

  function handleBackdropDismiss() {
    if (!canBeClosed) {
      return;
    } else if (customCloseHandler) {
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
