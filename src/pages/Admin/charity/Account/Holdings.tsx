import { Coin } from "@cosmjs/proto-signing";
import { CW20, GenericBalance } from "types/server/contracts";
import TableSection, { Cells } from "components/TableSection";
import { condense, humanize } from "helpers";
import { assets } from "../constants";

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

      <>{humanize(condense(props.amount), 4)}</>
    </Cells>
  );
}
