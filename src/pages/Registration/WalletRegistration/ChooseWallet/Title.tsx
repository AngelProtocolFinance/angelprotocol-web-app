import { BsExclamationCircle } from "react-icons/bs";
import { useSetModal } from "components/Modal/Modal";
import TerraInfoModal from "./TerraInfoModal";

// Purpose of this component is to avoid rendering the InfoIcon in a non-intuitive way on smaller screens
// (the user would expect the info icon to remain at the end of the string even on smaller screens, but
// React renders it all the way to the right, making it appear unrelated to the title, reducing UX)
export default function Title() {
  return (
    <>
      {/* Appear inline on large screens */}
      <h2 className="hidden lg:flex text-lg xl:text-xl font-semibold gap-2 items-center">
        Please choose one of the options below to register your Terra wallet
        <InfoIcon />
      </h2>

      {/* Appear in two rows on small to large screens */}
      <h2 className="hidden sm:flex text-lg flex-col lg:hidden font-semibold items-center">
        Please choose one of the options
        <div className="flex gap-1">
          below to register your Terra wallet
          <InfoIcon />
        </div>
      </h2>

      {/* Appear in three rows up to small screens */}
      <h2 className="sm:hidden flex-col font-semibold">
        <div>Please choose one of</div>
        <div>the options below to</div>
        <div className="flex gap-1 justify-center">
          register your Terra wallet
          <InfoIcon />
        </div>
      </h2>
    </>
  );
}

function InfoIcon() {
  const { showModal } = useSetModal();
  const showTerraInfoModal = () => showModal(TerraInfoModal, {});
  return (
    <BsExclamationCircle
      className="text-thin-blue cursor-pointer"
      onClick={showTerraInfoModal}
    />
  );
}
