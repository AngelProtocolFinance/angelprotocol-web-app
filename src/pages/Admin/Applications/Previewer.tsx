import { CharityApplication } from "@types-server/aws";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Icon from "components/Icon";
import PreviewForm from "./PreviewForm";

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
