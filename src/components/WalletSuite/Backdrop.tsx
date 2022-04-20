import useAttachKeyPressHandler from "hooks/useAttachKeypressHandler";

export default function Backdrop(props: { closeHandler: () => void }) {
  useAttachKeyPressHandler("Escape", props.closeHandler);
  return (
    <div
      onClick={props.closeHandler}
      className="z-10 fixed top-0 right-0 left-0 bottom-0"
    />
  );
}
