import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";

type Props = { text: string };
export default function Warning(props: Props) {
  const { closeModal } = useModalContext();
  return (
    <div className="grid justify-items-center p-5 text-gray-d2">
      <Icon type="Info" className="text-3xl  mb-2" />
      <p className="text-center">{props.text}</p>
      <button
        onClick={closeModal}
        className="text-sm bg-blue-d1 hover:bg-blue px-8 py-0.5 rounded-full text-white mt-3"
      >
        OK
      </button>
    </div>
  );
}
