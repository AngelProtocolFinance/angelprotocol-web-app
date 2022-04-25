import { IconType } from "react-icons";
import { useGetter } from "store/accessors";
import { getIcon } from "components/Icons/Icons";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "./TransactionPrompt";

export default function TransactionHint() {
  const step = useGetter((state) => state.transaction.stage.step);

  switch (step) {
    case "error":
      return (
        <StatusButton Icon={getIcon("Exclamation")} iconClass="text-red-300" />
      );
    case "broadcast":
    case "submit":
      return (
        <StatusButton Icon={getIcon("Loading")} iconClass="animate-spin" />
      );
    case "success":
      return (
        <StatusButton Icon={getIcon("Check")} iconClass="text-green-300" />
      );
    default:
      return null;
  }
}

function StatusButton(props: { Icon: IconType; iconClass?: string }) {
  const { showModal } = useSetModal();
  function showPrompt() {
    showModal(TransactionPrompt, {});
  }
  return (
    <button
      onClick={showPrompt}
      className="grid place-items-center border border-white/40 hover:bg-white/10 rounded-md px-4 text-white-grey/80"
    >
      <props.Icon className={`${props.iconClass || ""} `} />
    </button>
  );
}
