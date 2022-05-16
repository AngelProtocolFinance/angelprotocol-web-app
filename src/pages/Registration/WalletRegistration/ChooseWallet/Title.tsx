import { BsExclamationCircle } from "react-icons/bs";
import { useModalContext } from "components/ModalContext/ModalContext";
import TerraInfoModal from "./TerraInfoModal";

// Purpose of this component is to avoid rendering the InfoIcon in a non-intuitive way on smaller screens
// (the user would expect the info icon to remain at the end of the string even on smaller screens, but
// React renders it all the way to the right, making it appear unrelated to the title, reducing UX)
export default function Title() {
  return (
    <h2 className="flex text-lg xl:text-xl font-semibold gap-2 items-center">
      Please choose one of the options below to register a new Terra wallet for
      your charity
      <InfoIcon />
    </h2>
  );
}

function InfoIcon() {
  const { showModal } = useModalContext();
  return (
    <BsExclamationCircle
      className="text-thin-blue cursor-pointer"
      onClick={() => showModal(TerraInfoModal, {})}
    />
  );
}
