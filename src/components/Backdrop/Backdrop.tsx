import { useRef } from "react";
import useAttachKeyPressHandler from "hooks/useAttachKeypressHandler";
import useFocusHandler from "./useFocusHandler";

type Props = {
  classes: string;
  onClick: () => void;
};

export default function Backdrop(props: Props) {
  const { classes, onClick } = props;

  const backdropRef = useRef<HTMLDivElement | null>(null);
  useFocusHandler(backdropRef);
  useAttachKeyPressHandler("Escape", onClick);

  return (
    <div
      role="alertdialog"
      onClick={onClick}
      className={classes}
      ref={backdropRef}
    />
  );
}
