import Icon from "components/Icon";
import { useModalContext } from "components/ModalContext/ModalContext";
import PreviewForm from "./PreviewForm";
import { CharityApplication } from "./types";

export default function Reviewer(props: { application: CharityApplication }) {
  const { closeModal } = useModalContext();

  return (
    <div
      className={
        "w-full max-w-md bg-white-grey rounded-md overflow-hidden pt-4 fixed-center z-20"
      }
    >
      <button
        onClick={closeModal}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <Icon type="Close" size={25} />
      </button>
      <PreviewForm application={props.application} />
    </div>
  );
}
