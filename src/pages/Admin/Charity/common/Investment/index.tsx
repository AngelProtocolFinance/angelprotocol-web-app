import { useModalContext } from "contexts/ModalContext";
import { humanize, maskAddress } from "helpers";
import Redeemer from "./Redeemer";

// type Action = "invest" | "redeem";

export default function Investment() {
  const props = {
    address: "1231283",
    invested: "0",
    symbol: "USD",
    action: "invest",
  };
  const { address, invested, symbol, action } = props;

  const { showModal } = useModalContext();

  return (
    <div className="@container border border-gray-l3 dark:border-bluegray rounded bg-orange-l6 dark:bg-blue-d6">
      <p className="p-6 font-work">{maskAddress(address)}</p>
      <div className="border-t border-gray-l3 dark:border-bluegray grid @md:flex @md:justify-between p-6">
        <div>
          <p className="text-xs uppercase text-gray-d1 dark:text-gray mb-1">
            Current balance
          </p>
          <p className="font-bold font-heading text-sm">
            {humanize(invested)} {symbol}
          </p>
        </div>
        <button
          type="button"
          onClick={() => showModal(Redeemer, {})}
          className="btn-outline-filled px-8 py-2 text-sm mt-6 @md:mt-0 @md:text-base"
        >
          {action}
        </button>
      </div>
    </div>
  );
}
