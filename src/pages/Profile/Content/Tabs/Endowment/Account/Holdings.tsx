import { Coin } from "@cosmjs/proto-signing";
import { CW20, GenericBalance } from "types/contracts";
import TableSection, { Cells } from "components/TableSection";
import { condense, humanize } from "helpers";
import { tokens } from "constants/tokens";

export default function Holdings(props: { balance: GenericBalance }) {
  return (
    <table>
      <TableSection type="tbody" rowClass="">
        {props.balance.native
          .map((bal) => <Balance {...bal} key={bal.denom} />)
          .concat(
            props.balance.cw20.map((bal) => (
              <Balance {...bal} key={bal.address} />
            ))
          )}
      </TableSection>
    </table>
  );
}

function Balance(props: CW20 | Coin) {
  const id = "address" in props ? props.address : props.denom;
  return (
    <Cells type="td" cellClass="py-2">
      <div className="flex items-center gap-2">
        <img className="w-6 h-6 object-contain" src={tokens[id].icon} alt="" />
        <span>{tokens[id].symbol}</span>
      </div>

      <div className="text-right">{humanize(condense(props.amount), 4)}</div>
    </Cells>
  );
}
