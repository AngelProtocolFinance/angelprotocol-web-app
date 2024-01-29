import Icon from "components/Icon";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import Summary from "./Summary";

export type AmountProps = {
  type: "total" | "projected";
  locked: number;
  liquid: number;
};
export default function Amount(props: AmountProps) {
  const { showModal } = useModalContext();
  function showSummary() {
    showModal(Summary, props);
  }
  return (
    <div className="flex gap-2 items-center w-40">
      <button onClick={showSummary} aria-label="more information">
        <Icon type="Info" className="block text-blue hover:text-orange" />
      </button>
      ${humanize(props.locked + props.liquid, 0)}
    </div>
  );
}
