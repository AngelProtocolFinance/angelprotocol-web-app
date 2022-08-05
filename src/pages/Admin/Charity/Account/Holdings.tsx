import { Coin } from "@cosmjs/proto-signing";
import Decimal from "decimal.js";
import { CW20, GenericBalance } from "types/server/contracts";
import haloIcon from "assets/icons/currencies/halo_solid.png";
import junoIcon from "assets/icons/currencies/juno.svg";
import TableSection, { Cells } from "components/TableSection";
import toCurrency from "helpers/toCurrency";

const assets: { [index: string]: { name: string; icon: string } } = {
  ujunox: { icon: junoIcon, name: "Juno" },
  junoabc123: { icon: haloIcon, name: "Halo" },
};

export default function Holdings(props: { balance: GenericBalance }) {
  return (
    <table>
      <TableSection type="tbody" rowClass="border-b border-zinc-50/20">
        <>
          {props.balance.native.map((bal) => (
            <Balance {...bal} key={bal.denom} />
          ))}
        </>
        <>
          {props.balance.cw20.map((bal) => (
            <Balance {...bal} key={bal.address} />
          ))}
        </>
      </TableSection>
    </table>
  );
}

function Balance(props: CW20 | Coin) {
  const id = "address" in props ? props.address : props.denom;
  return (
    <Cells type="td" cellClass="py-2">
      <div className="flex items-center gap-2">
        <img className="w-6 h-6 object-contain" src={assets[id].icon} alt="" />
        <span>{assets[id].name}</span>
      </div>

      <>{toCurrency(new Decimal(props.amount).divToInt(1e6).toNumber(), 4)}</>
    </Cells>
  );
}
