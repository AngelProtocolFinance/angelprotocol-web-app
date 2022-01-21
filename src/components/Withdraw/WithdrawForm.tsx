import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import { setFee, setStage } from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import { Step } from "services/transaction/types";
import useWithdrawHoldings from "./useWithdrawHoldings";
import Status from "./Status";
import Amount from "./Amount";
import { useSetModal } from "components/Nodal/Nodal";
import { vaults } from "constants/contracts";
import { useEndowmentHoldingsState } from "services/terra/states";

export default function WithdrawForm() {
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useFormContext<Values>();

  const account_addr = getValues("account_addr");
  const holdings = useEndowmentHoldingsState(account_addr);
  const handleWithdrawHoldings = useWithdrawHoldings();
  const { form_loading, form_error } = useGetter((state) => state.transaction);

  return (
    <form
      onSubmit={handleSubmit(handleWithdrawHoldings)}
      autoComplete="off"
      className="grid p-4 pt-0"
    >
      <Status />
      <h3 className="mb-1 text-lg text-angel-grey text-center font-semibold font-heading">
        Withdraw from Accounts
      </h3>
      <p className="mb-3 md:mb-6 text-angel-grey text-center text-xs">
        Enter the quantity of tokens to withdraw from each of the active Liquid
        Account's current strategies.
      </p>

      {vaults.map((vault) => {
        const holding = holdings.liquid_cw20.find(
          (holding) => holding.address === vault.address
        );
        if (holding) {
          return <Amount {...{ ...vault, balance: holding.amount }} />;
        } else {
          return null;
        }
      })}

      <button
        type="submit"
        className="m-auto uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold disabled:bg-grey-accent mt-4"
        disabled={isSubmitting || form_loading || !!form_error}
      >
        {form_loading ? "Estimating..." : "Withdraw"}
      </button>
    </form>
  );
}
