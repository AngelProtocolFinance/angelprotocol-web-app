import toCurrency from "helpers/toCurrency";
import { Dec } from "@terra-money/terra.js";
import { useGovStaker, useHaloBalance } from "services/terra/queriers";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";

export default function Balance() {
  const gov_staker = useGovStaker();
  const halo_balance = useHaloBalance();
  const { watch } = useFormContext<Values>();
  const is_stake = watch("is_stake");
  const balance = is_stake
    ? halo_balance
    : new Dec(gov_staker.balance).div(1e6).toNumber();

  return (
    <p className="text-xs font-light font-heading flex items-center">
      <span className="mr-1 text-xs">{is_stake ? "Balance:" : "Staked:"}</span>
      <span>{toCurrency(balance, 3, true)} HALO</span>
    </p>
  );
}
