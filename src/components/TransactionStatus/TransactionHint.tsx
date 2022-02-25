import { VscLoading } from "react-icons/vsc";
import { BiCheck } from "react-icons/bi";
import { AiOutlineExclamation } from "react-icons/ai";
import { useGetter } from "store/accessors";
import { IconType } from "react-icons";
import { Step } from "services/transaction/types";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "./TransactionPrompt";
export default function TransactionHint() {
  const step = useGetter((state) => state.transaction.stage.step);

  switch (step) {
    case Step.error:
      return (
        <StatusButton Icon={AiOutlineExclamation} iconClass="text-red-300" />
      );
    case Step.broadcast:
    case Step.submit:
      return <StatusButton Icon={VscLoading} iconClass="animate-spin" />;
    case Step.success:
      return <StatusButton Icon={BiCheck} iconClass="text-green-300" />;
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
      className="grid place-items-center border border-opacity-40 hover:bg-white hover:bg-opacity-10 rounded-md px-4 text-white-grey text-opacity-80"
    >
      <props.Icon className={`${props.iconClass || ""} `} />
    </button>
  );
}
