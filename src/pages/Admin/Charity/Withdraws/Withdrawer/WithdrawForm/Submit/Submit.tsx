import { useFormContext } from "react-hook-form";
import { FV } from "../types";
import { useAdminContext } from "../../../../../Context";
import { useWithdrawContext } from "../../Context";

export default function Submit() {
  const { withdrawEndowSource } = useWithdrawContext();
  const { id: thisEndowId } = useAdminContext();
  const {
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<FV>();

  const isFundsFromClosedEndow = withdrawEndowSource
    ? withdrawEndowSource.id !== thisEndowId
    : false;

  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <button
      type="submit"
      disabled={isSubmitDisabled}
      className="btn-orange py-3"
    >
      {isFundsFromClosedEndow ? "Transfer to this endowment" : "Withdraw"}
    </button>
  );
}
