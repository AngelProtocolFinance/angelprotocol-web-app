import {
  AccountType,
  EndowmentBalance,
  Strategy,
  VaultWithBalance,
} from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { condenseToNum } from "helpers";

type Props = EndowmentBalance & { type: AccountType };
export default function Table({
  type,
  oneoff_liquid,
  oneoff_locked,
  strategies_liquid,
  strategies_locked,
}: Props) {
  const { endowment } = useAdminResources();
  const stratsBal = type === "liquid" ? strategies_liquid : strategies_locked;
  const oneOffsBal = type === "liquid" ? oneoff_liquid : oneoff_locked;

  const strats = endowment.strategies[type];
  const oneOffs = endowment.oneoff_vaults[type];

  return <></>;
}

type Vault = {
  address: string;
  balance: number;
};

function withBalances(
  vaults: Strategy[] | string[],
  balances: VaultWithBalance[]
): Vault[] {
  return vaults.map((vault) => {
    const [_, vaultBalance = "0"] =
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
