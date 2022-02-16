import { vaults } from "constants/contracts";
import { useFormContext } from "react-hook-form";
import { useEndowmentHoldingsState } from "services/terra/account/states";
import { useGetter } from "store/accessors";
import Amount from "./Amount";
import { Fee, ToReceive, Total } from "./Misc";
import Status from "./Status";
import { Values } from "./types";
import useWithdraw from "./useWithdraw";

export default function WithdrawForm() {
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<Values>();

  const account_addr = getValues("account_addr");
  const { holdings } = useEndowmentHoldingsState(account_addr);
  const handleWithdraw = useWithdraw();
  const { form_loading, form_error } = useGetter((state) => state.transaction);

  const isFormDisabled =
    isSubmitting || form_loading || !!form_error || !isValid || !isDirty;

  return (
    <form
      onSubmit={handleSubmit(handleWithdraw)}
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
