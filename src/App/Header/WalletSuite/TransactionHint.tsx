import { useModalContext } from "contexts/ModalContext";
import Icon, { IconTypes } from "components/Icon";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter } from "store/accessors";

export default function TransactionHint() {
  const step = useGetter((state) => state.transaction.stage.step);

  switch (step) {
    case "error":
      return <StatusButton iconType="Exclamation" iconClass="text-red-l2" />;
    case "broadcast":
    case "submit":
      return <StatusButton iconType="Loading" iconClass="animate-spin" />;
    case "success":
      return <StatusButton iconType="Check" iconClass="text-green-l2" />;
    default:
      return null;
  }
}

function StatusButton(props: { iconType: IconTypes; iconClass?: string }) {
  const { showModal } = useModalContext();
  function showPrompt() {
    showModal(TransactionPrompt, {});
  }
  return (
    <button
      onClick={showPrompt}
      className="grid place-items-center border border-white/40 hover:bg-white/10 rounded-md px-4 text-white/80 mr-1"
    >
      <Icon type={props.iconType} className={props.iconClass || ""} />
    </button>
  );
}
