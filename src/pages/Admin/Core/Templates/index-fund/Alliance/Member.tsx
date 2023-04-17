import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Editor from "./Editor";

export default function Member({ address }: { address: string }) {
  const { showModal } = useModalContext();
  return (
    <li className="flex gap-1 text-gray-d1 dark:text-gray items-center ">
      <Icon type="User" />
      <span className="text-sm">{address}</span>
      <button
        onClick={() => showModal(Editor, { address, action: "remove" })}
        type="button"
        className="bg-white/30 ml-auto rounded-md p-0.5"
      >
        <Icon type="Close" />
      </button>
    </li>
  );
}
