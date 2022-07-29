import { PropsWithChildren, useEffect } from "react";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";

export default function ErrorDisplayer(
  props: PropsWithChildren<{ error?: Error }>
) {
  const { showModal } = useModalContext();

  useEffect(() => {
    console.log("if props.error");

    if (props.error) {
      console.log("showModal", props.error.message);

      showModal(Popup, { message: props.error.message });
    }
  }, [props.error]);

  return <>{props.children}</>;
}
