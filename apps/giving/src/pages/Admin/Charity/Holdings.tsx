import { Coin } from "@cosmjs/proto-signing";
import { Link } from "react-router-dom";
import { AccountType, CW20, GenericBalance } from "types/contracts";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { condense, humanize } from "helpers";
import { adminRoutes } from "constants/routes";
import { tokens } from "constants/tokens";

type Props = GenericBalance & { type: AccountType };
export default function Holdings({ cw20, native, type }: Props) {
  if (cw20.length <= 0 && native.length <= 0) {
    return (
      <div className="grid">
        <p className="text-lg font-heading">0.000</p>
        <WithdrawLink type={type} classes="mt-4" />
      </div>
    );
  }

  return (
    <>
      <table className="w-full">
        <TableSection type="tbody" rowClass="">
          {native
            .map((bal) => <Balance {...bal} key={bal.denom} />)
            .concat(cw20.map((bal) => <Balance {...bal} key={bal.address} />))}
        </TableSection>
      </table>
      <WithdrawLink type={type} classes="mt-4" />
    </>
  );
}

function WithdrawLink(props: { classes?: string; type: AccountType }) {
  return (
    <Link
      to={adminRoutes.withdraws}
      state={props.type}
      className={`flex justify-end items-center gap-2 uppercase text-sm text-gray-d1 dark:text-gray hover:text-orange hover:dark:text-orange ${props.classes}`}
    >
      <span>withdraw</span>
      <Icon type="Forward" />
    </Link>
  );
}

function Balance(props: CW20 | Coin) {
  const id = "address" in props ? props.address : props.denom;
  return (
    <Cells type="td" cellClass="py-2 font-mono uppercase">
      <div className="flex items-center gap-2">
        <img className="w-6 h-6 object-contain" src={tokens[id].icon} alt="" />
        <span>{tokens[id].symbol}</span>
      </div>

      <>{humanize(condense(props.amount), 4)}</>
    </Cells>
  );
}
