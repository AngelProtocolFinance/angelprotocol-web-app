import { useModalContext } from "@ap/contexts";
import { humanize, maskAddress } from "@ap/helpers";
import { Vault } from "@ap/types/services";
import Investor from "./Investor";
import Redeemer from "./Redeemer";

type Action = "invest" | "redeem";

export default function Investment({
  action,
  ...props
}: Vault & { action: Action }) {
  const { address, invested, symbol } = props;

  const { showModal } = useModalContext();

  return (
    <div className="border border-prim rounded bg-orange-l6 dark:bg-blue-d6">
      <p className="p-6 font-work">{maskAddress(address)}</p>
      <div className="border-t border-prim flex justify-between p-6">
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
          onClick={() =>
            showModal(action === "invest" ? Investor : Redeemer, props)
          }
          className="btn-outline-filled px-8 py-2"
        >
          {action}
        </button>
      </div>
    </div>
  );
}
