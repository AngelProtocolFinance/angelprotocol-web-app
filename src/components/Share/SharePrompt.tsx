import Icon from "components/Icons/Icons";
import { useSetModal } from "components/Modal/Modal";
import Share from "./Share";

export default function SharePrompt() {
  const { hideModal } = useSetModal();

  return (
    <div className="relative bg-white-grey rounded-md pt-4 w-full max-w-md">
      <button
        onClick={hideModal}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <Icon type="Clock" size={25} />
      </button>
      <Share />
    </div>
  );
}
