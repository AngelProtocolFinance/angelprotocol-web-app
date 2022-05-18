import { useModalContext } from "contexts/ModalContext/ModalContext";
import Icon from "components/Icon";
import toCurrency from "helpers/toCurrency";
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
          className="mt-0.5 block text-angel-blue hover:text-angel-orange"
        />
      </button>
      <p className="text-angel-grey">
        ${toCurrency(props.locked + props.liquid, 0)}
      </p>
    </div>
  );
}
