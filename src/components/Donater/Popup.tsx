import { useSetModal } from "components/Nodal/Nodal";
import { ReactNode } from "react";
import { MdOutlineClose } from "react-icons/md";

export type PropChild = { children?: ReactNode };
export default function Popup(props: PropChild) {
  const { hide: hideModal } = useSetModal();
  return (
    <div className="bg-white rounded-md grid w-full max-w-xs rounded-md overflow-hidden">
      <div className="bg-angel-orange p-2 flex items-center justify-end">
        <button onClick={hideModal}>
          <MdOutlineClose />
        </button>
      </div>
      {props.children}
    </div>
  );
}

export function Content(props: PropChild) {
  return (
    <div className="min-h-110 flex flex-col items-center">{props.children}</div>
  );
}

export function Actions(props: PropChild) {
  return <div className="p-2 flex gap-2 mb-2">{props.children}</div>;
}
