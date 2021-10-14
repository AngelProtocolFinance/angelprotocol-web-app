import toCurrency from "helpers/toCurrency";
import { charities } from "./charities";
import { Addresses } from "./types";
import tempIcon from "assets/icons/tcalogo.png";
import { Balance } from "contracts/types";
import maskAddress from "helpers/maskAddress";
import Copier, { Addr } from "components/Copier/Copier";
import Amount from "./Amount";
type Props = {
  address: Addresses;
  balance: Balance;
};

//address
//sums
export default function Entry({ address, balance }: Props) {
  const { name, description } = charities[address];
  return (
    <tr>
      <td className="cell flex items-center">
        <img src={tempIcon} alt="" className="w-14 h-14 m-6 ml-0" />
        <div>
          <a
            href="https://angelprotocol.io"
            target="_blank"
            rel="noreferrer noopener"
            className="text-lg text-angel-grey font-bold pt-2 block"
          >
            {name}
          </a>
          <p className="max-w-md text-sm text-angel-grey leading-normal mb-2">
            {description}
          </p>
        </div>
      </td>
      <td className="cell">
        <div className="flex items-center gap-2">
          <span title={address} className="text-md text-angel-grey">
            {maskAddress(address)}
          </span>
          <Copier colorClass="text-angel-grey text-sm" text={address as Addr} />
        </div>
      </td>
      <td className="cell">
        <div className="flex flex-col">
          <Amount type="locked" amount={balance.total_locked} />
          <Amount type="liquid" amount={balance.total_liq} />
        </div>
      </td>
    </tr>
  );
}
