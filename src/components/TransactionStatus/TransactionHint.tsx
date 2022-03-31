import { useGetter } from "store/accessors";
import { IconType } from "react-icons";
import { Step } from "services/transaction/types";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "./TransactionPrompt";
import { getIcon } from "components/Icons/Icons";
export default function TransactionHint() {
  const step = useGetter((state) => state.transaction.stage.step);

  switch (step) {
    case Step.error:
      return (
        <StatusButton Icon={getIcon("Exclamation")} iconClass="text-red-300" />
      );
    case Step.broadcast:
    case Step.submit:
      return (
        <StatusButton Icon={getIcon("Loading")} iconClass="animate-spin" />
      );
    case Step.success:
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
