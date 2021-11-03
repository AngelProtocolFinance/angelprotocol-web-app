import { useSetModal } from "components/Nodal/Nodal";
import Popup, { Content, Actions } from "./Popup";
import { AiOutlineInfoCircle } from "react-icons/ai";

export type Props = { desc: string; url?: string };
export default function ErrPop(props: Props) {
  const { hide: hideModal } = useSetModal();
  return (
    <Popup>
      <Content>
        <div className="flex flex-col items-center my-auto p-4 ">
          <AiOutlineInfoCircle className="text-angel-grey text-2xl mb-1 " />
          <p className="text-center text-angel-grey">{props.desc}</p>
        </div>
        {props.url && (
          <a
            href={props.url}
            target="_blank"
            className="uppercase text-angel-blue text-sm mb-2"
          >
            view transaction details
          </a>
        )}
        <Actions>
          <button
            onClick={hideModal}
            className="bg-blue-accent hover:bg-angel-blue px-6 py-1 rounded-full uppercase text-sm text-white"
          >
            ok
          </button>
        </Actions>
      </Content>
    </Popup>
  );
}
