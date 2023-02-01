import {
  AccountType,
  EndowmentBalance,
  Strategy,
  VaultWithBalance,
} from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { condenseToNum, humanize, maskAddress } from "helpers";

type Props = EndowmentBalance & { type: AccountType; classes?: string };
export default function Table({
  classes = "",
  type,
  invested_liquid,
  invested_locked,
}: Props) {
  const { details } = useAdminResources<"charity">();

  const balances = type === "liquid" ? invested_liquid : invested_locked;
  const strats = details[type].strats;
  const oneOffs = details[type].one_offs;

  return (
    <table className={`w-full border border-zinc-50/30 ${classes} table-fixed`}>
      <TableSection
        type="thead"
        rowClass="divide-x divide-zinc-50/30 border-b border-zinc-50/30"
      >
        <Cells type="th" cellClass="p-2 uppercase font-normal">
          <>vault</>
          <>Balance</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="divide-x divide-zinc-50/30 border-b border-zinc-50/30 last:border-none"
      >
        {withBalances(strats, balances)
          .map((vault) => <Row key={vault.address} {...vault} />)
          .concat(
            withBalances(oneOffs, balances).map((vault) => (
              <Row key={vault.address} {...vault} />
            ))
          )}
      </TableSection>
    </table>
  );
}

type Vault = {
  address: string;
  balance: number;
};

function Row({ balance, address }: Vault) {
  return (
    <Cells type="td" cellClass="p-2 font-mono text-zinc-50/80">
      <div className="flex items-center gap-2">
        <Icon type="Safe" size={18} />
        <span>{maskAddress(address)}</span>
      </div>
      <>{humanize(balance, 4)}</>
    </Cells>
  );
}

function withBalances(
  vaults: Strategy[] | string[],
  balances: VaultWithBalance[]
): Vault[] {
  return vaults.map((vault) => {
    const [, vaultBalance = "0"] =
      balances.find(([vaultAddr]) =>
        typeof vault === "string"
          ? vault === vaultAddr
          : vault.vault === vaultAddr
      ) || [];

    const balance = condenseToNum(vaultBalance);
    return {
      address: typeof vault === "string" ? vault : vault.vault,
      balance,
    };
  });
}
