import Status from "../Status";
import { Fee, ToReceive, Total } from "./Misc";
import Amount from "./Amount";
import useWithdraw from "./useWithdraw";
import InputField from "./InputField";

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

      {vaultFields.map(
        (vaultField) =>
          vaultField.ustBalance.gt(0) && (
            <Amount key={vaultField.fieldId} {...vaultField} />
          )
      )}
      <InputField
        label="Beneficiary"
        field="beneficiary"
        placeholder="terra1..."
      />
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
