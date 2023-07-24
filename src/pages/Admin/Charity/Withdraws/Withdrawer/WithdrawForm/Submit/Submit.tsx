import { useFormContext } from "react-hook-form";
import { FV } from "../types";

export default function Submit() {
  const {
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<FV>();

  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;
  const accountType = getValues("accountType");

  return (
    <button
      type="submit"
      disabled={isSubmitDisabled}
      className="btn-orange py-3"
    >
      {accountType === "locked" ? "Transfer to liquid" : "Withdraw"}
    </button>
  );
}
