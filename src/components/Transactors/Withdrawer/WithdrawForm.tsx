import Status from "../Status";
import { Fee, ToReceive, Total } from "./Misc";
import Amount from "./Amount";
import useWithdraw from "./useWithdraw";

export default function WithdrawForm() {
  const { vaultFields, withdraw, isFormLoading, isSubmitDisabled } =
    useWithdraw();

  return (
    <form
      onSubmit={withdraw}
      autoComplete="off"
      className="bg-white-grey grid p-4 pt-0 mt-4"
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

      {vaultFields.map(
        (vaultField) =>
          vaultField.ustBalance.gt(0) && (
            <Amount key={vaultField.fieldId} {...vaultField} />
          )
      )}

      <Total />
      <Fee />
      <ToReceive />

      <button
        type="submit"
        className="w-full m-auto uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold disabled:bg-grey-accent mt-4"
        disabled={isSubmitDisabled}
      >
        {isFormLoading ? "Estimating..." : "Withdraw"}
      </button>
    </form>
  );
}
