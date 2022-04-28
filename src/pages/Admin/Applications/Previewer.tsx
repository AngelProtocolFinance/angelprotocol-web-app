import { CharityApplication } from "@types-server/aws";
import Icon from "components/Icons/Icons";
import { useSetModal } from "components/Modal/Modal";
import PreviewForm from "./PreviewForm";

export default function Reviewer(props: { application: CharityApplication }) {
  const { hideModal } = useSetModal();

  return (
    <div
      className={`relative w-full max-w-md "bg-white-grey rounded-md overflow-hidden pt-4" : ""`}
    >
      <button
        onClick={hideModal}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <Icon type="Close" size={25} />
      </button>
      <PreviewForm application={props.application} />
    </div>
  );
}
