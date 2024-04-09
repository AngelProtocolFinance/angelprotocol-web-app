import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { Cells } from "components/TableSection";
import { getTxUrl, humanize, maskAddress, roundDownToNum } from "helpers";
import { DonationRecord } from "types/aws";

export default function Row(
  props: DonationRecord & { hasMore?: boolean; classes?: string }
) {
  const Amount = amount(props.splitLiqPct, props.finalAmountUsd);
  return (
    <Cells
      type="td"
      cellClass={`p-3 border-t border-gray-l4 max-w-[256px] truncate ${props.classes}`}
    >
      <span className="text-sm">
        {new Date(props.date).toLocaleDateString()}
      </span>

      <>{props.viaId === "fiat" ? "Fiat donation" : props.viaName}</>

      <Amount type="total" />
      <Amount type="liq" />
      <Amount type="locked" />

      {props.viaId === "staging" || props.viaId === "fiat" ? (
        <>--</>
      ) : (
        <ExtLink
          //default to ethereum for staging
          href={getTxUrl(props.viaId, props.id)}
          className="text-center text-blue-d1 hover:text-navy uppercase text-sm"
        >
          {maskAddress(props.id)}
        </ExtLink>
      )}

      <td className="relative">
        {!props.donorDetails ? (
          <Icon
            type="Close"
            //prevent icon size from affecting row height
            className="left-4 absolute top-1/2 -translate-y-1/2 text-red "
            size={22}
          />
        ) : (
          <Icon
            type="CheckCircle"
            className="left-4 absolute top-1/2 -translate-y-1/2  text-green"
            size={20}
          />
        )}
      </td>
    </Cells>
  );
}

const amount = (splitLiqPct: number, amount = 0) => {
  const liq = roundDownToNum(amount * (splitLiqPct / 100), 2);
  const locked = amount - liq;
  const amounts = {
    total: amount,
    liq,
    locked,
  };
  return ({ type }: { type: keyof typeof amounts }) => {
    const val = amounts[type];
    return val ? <>${humanize(val)}</> : <>--</>;
  };
};
