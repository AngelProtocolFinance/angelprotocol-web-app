import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { humanize } from "helpers";
import Summary from "./Summary";

type Props = {
  type: string;
  locked: number;
  liquid: number;
};
export default function Amount(props: Props) {
  const { showModal } = useModalContext();
  function showSummary() {
    showModal(Summary, {
      type: props.type,
      principal: props.locked,
      impact: props.liquid,
    });
  }
  return (
    <div className="flex gap-0.5 items-center w-40">
      <button onClick={showSummary}>
        <Icon
          type="Info"
          className="mt-0.5 block text-blue hover:text-orange"
        />
      </button>
      <p className="text-gray-d2">
        ${humanize(props.locked + props.liquid, 0)}
      </p>
    </div>
  );
}
