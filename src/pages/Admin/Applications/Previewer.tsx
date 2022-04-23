import Icon from "components/Icons/Icons";
import { useModalContext } from "components/ModalContext/ModalContext";
import PreviewForm from "./PreviewForm";
import { CharityApplication } from "./types";

export default function Reviewer(props: { application: CharityApplication }) {
  const { closeModal } = useModalContext();

  return (
    <div
      className={`relative w-full max-w-md "bg-white-grey rounded-md overflow-hidden pt-4" : ""`}
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
