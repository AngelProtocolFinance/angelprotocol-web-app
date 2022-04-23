import { useRef } from "react";
import useAttachKeyPressHandler from "hooks/useAttachKeypressHandler";
import { useModalContext } from "./ModalContext";
import useFocusHandler from "./useFocusHandler";

export default function Backdrop(props: { classes: string }) {
  const { closeModal } = useModalContext();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  useFocusHandler(backdropRef);
  useAttachKeyPressHandler("Escape", closeModal);

  return (
    <div
      role="alertdialog"
      onClick={closeModal}
      className={props.classes}
      ref={backdropRef}
    />
  );
}
