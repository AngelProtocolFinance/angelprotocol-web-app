import Icon, { IconTypes } from "components/Icons/Icons";
import { useSetModal } from "components/Modal/Modal";

export type PopupProps = { message: string };
export default function Popup(props: { message: string }) {
  const { hideModal } = useSetModal();
  return (
    <div className="p-4 grid grid-rows-1a place-items-center  bg-white-grey w-full max-w-xs min-h-115  rounded-xl shadow-lg overflow-hidden relative">
      <button className="absolute top-3 right-3" onClick={hideModal}>
        <Icon iconType={IconTypes.Close} className="text-angel-grey" />
      </button>
      <p className="text-angel-grey text-center my-18">{props.message}</p>
    </div>
  );
}
