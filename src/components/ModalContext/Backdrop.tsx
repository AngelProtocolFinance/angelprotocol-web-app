import { PropsWithChildren, useRef } from "react";
import useAttachDivClickhandler from "hooks/useAttachDivClickHandler";
import useAttachKeyPressHandler from "hooks/useAttachKeypressHandler";
import { useModalContext } from "./ModalContext";
import useFocusHandler from "./useFocusHandler";

interface IBackdrop {
  _classes: string;
  _isBackdropDismissible: boolean;
}
export default function Backdrop({
  children,
  _classes,
  _isBackdropDismissible,
}: PropsWithChildren<IBackdrop>) {
  const { closeModal } = useModalContext();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  useFocusHandler(backdropRef);
  useAttachKeyPressHandler("Escape", closeModal);
  useAttachDivClickhandler(backdropRef, closeModal, !_isBackdropDismissible);
  return (
    <div role="alertdialog" className={_classes} ref={backdropRef}>
      {children}
    </div>
  );
}
