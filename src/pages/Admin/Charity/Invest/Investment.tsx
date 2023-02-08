import { Vault } from "services/types";
import { humanize, maskAddress } from "helpers";

export default function Investment({ address, balance }: Vault) {
  return (
    <div className="border border-prim rounded bg-orange-l6 dark:bg-blue-d6">
      <p className="p-6 font-work">{maskAddress(address)}</p>
      <div className="border-t border-prim flex justify-between p-6">
        <div>
          <p className="text-xs uppercase text-gray-d1 dark:text-gray mb-1">
            Current balance
          </p>
          <p className="font-bold font-heading text-sm">
            {humanize(balance)} USD
          </p>
        </div>
        <button className="btn-outline-filled px-8 py-2">invest</button>
      </div>
    </div>
  );
}
