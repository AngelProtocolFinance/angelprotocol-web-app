import { Coin } from "@cosmjs/proto-signing";
import { AccountType, CW20, GenericBalance } from "types/contracts";
import TableSection, { Cells } from "components/TableSection";
import { condense, humanize } from "helpers";
import { tokens } from "constants/tokens";

type Props = GenericBalance & { type: AccountType; classes?: string };
export default function Holdings({ cw20, native, classes = "" }: Props) {
  if (cw20.length <= 0 && native.length <= 0) {
    return (
      <div className={`grid ${classes}`}>
        <p className="text-zinc-50/80 text-lg font-heading">0.000</p>
      </div>
    );
  }

  return (
    <table className={`w-full border border-zinc-50/30 ${classes} table-fixed`}>
      <TableSection
        type="thead"
        rowClass="divide-x divide-zinc-50/30 border-b border-zinc-50/30"
      >
        <Cells type="th" cellClass="p-2 uppercase font-normal">
          <>token</>
          <>Balance</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="divide-x divide-zinc-50/30 border-b border-zinc-50/30 last:border-none"
      >
        {native
          .map((bal) => <Row {...bal} key={bal.denom} />)
          .concat(cw20.map((bal) => <Row {...bal} key={bal.address} />))}
      </TableSection>
    </table>
  );
}

function Row(props: CW20 | Coin) {
  const id = "address" in props ? props.address : props.denom;
  return (
    <Cells type="td" cellClass="p-2 font-mono uppercase text-zinc-50/80">
      <div className="flex items-center gap-2">
        <img className="w-6 h-6 object-contain" src={tokens[id].icon} alt="" />
        <span>{tokens[id].symbol}</span>
      </div>

      <>{humanize(condense(props.amount), 4)}</>
    </Cells>
  );
}
