import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useGetter, useSetter } from "store/accessors";
import { useEndowmentHoldingsState } from "services/terra/account/states";
import { vaults } from "constants/contracts";
import { withdraw } from "services/transaction/transactors/withdraw";
import useWithrawEstimator from "./useWithdrawEstimator";
import Status from "../Status";
import Amount from "./Amount";
import { Fee, ToReceive, Total } from "./Misc";
import { WithdrawValues } from "./types";

export default function WithdrawForm() {
  const {
    handleSubmit,
    getValues,
    formState: { isValid, isDirty },
  } = useFormContext<WithdrawValues>();

  const account_addr = getValues("account_addr");
  const { holdings } = useEndowmentHoldingsState(account_addr);
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const dispatch = useSetter();

  const { tx, wallet } = useWithrawEstimator();
  const _withraw = useCallback(
    () => {
      dispatch(withdraw({ wallet, tx: tx! }));
    },
    //eslint-disable-next-line
    [wallet, tx]
  );

  const isFormDisabled = form_loading || !!form_error || !isValid || !isDirty;

  return (
    <form
      onSubmit={handleSubmit(_withraw)}
      autoComplete="off"
      className="grid p-4 pt-0"
      noValidate
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
          return (
            <Amount
              key={holding.address}
              {...{ ...vault, balance: holding.amount }}
            />
          );
        } else {
          return null;
        }
      })}

      <Total />
      <Fee />
      <ToReceive />

      <button
        type="submit"
        className="m-auto uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold disabled:bg-grey-accent mt-4"
        disabled={isFormDisabled}
      >
        {form_loading ? "Estimating..." : "Withdraw"}
      </button>
    </form>
  );
}
