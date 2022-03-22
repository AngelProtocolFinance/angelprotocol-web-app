import { useSetModal } from "components/Modal/Modal";
import toCurrency from "helpers/toCurrency";
import Summary, { SummaryProps } from "./Summary";
import Icon, { IconTypes } from "components/Icons/Icons";

type Props = {
  type: string;
  locked: number;
  liquid: number;
};
export default function Amount(props: Props) {
  const { showModal } = useSetModal();
  function showSummary() {
    showModal<SummaryProps>(Summary, {
      type: props.type,
      principal: props.locked,
      impact: props.liquid,
    });
  }
  return (
    <div className="flex gap-0.5 items-center w-40">
      <button onClick={showSummary}>
        <Icon
          iconType={IconTypes.Info}
          className="mt-0.5 block text-angel-blue hover:text-angel-orange"
        />
      </button>
      <p className="text-angel-grey">
        ${toCurrency(props.locked + props.liquid, 0)}
      </p>
    </div>
  );
}
