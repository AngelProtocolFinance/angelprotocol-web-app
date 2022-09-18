import { Coin } from "@cosmjs/proto-signing";
import { AccountType, CW20, GenericBalance } from "types/contracts";
import TableSection, { Cells } from "components/TableSection";
import { condense, humanize } from "helpers";
import { coinAsset } from "constants/currency";

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
    <>
      <table className={`w-full border border-zinc-50/30 ${classes}`}>
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
            .map((bal) => <Balance {...bal} key={bal.denom} />)
            .concat(cw20.map((bal) => <Balance {...bal} key={bal.address} />))}
        </TableSection>
      </table>
    </>
  );
}

function Balance(props: CW20 | Coin) {
  const id = "address" in props ? props.address : props.denom;
  return (
    <Cells type="td" cellClass="p-2 font-mono uppercase text-zinc-50/80">
      <div className="flex items-center gap-2">
        <img
          className="w-6 h-6 object-contain"
          src={coinAsset[id].icon}
          alt=""
        />
        <span>{coinAsset[id].name}</span>
      </div>

      <>{humanize(condense(props.amount), 4)}</>
    </Cells>
  );
}
