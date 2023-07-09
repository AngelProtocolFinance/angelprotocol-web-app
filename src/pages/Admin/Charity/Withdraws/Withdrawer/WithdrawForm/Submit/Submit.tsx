import { useFormContext } from "react-hook-form";
import { FV } from "../types";

export default function Submit() {
  const {
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<FV>();
  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <button
      type="submit"
      disabled={isSubmitDisabled}
      className="btn-orange py-3"
    >
      Withdraw
    </button>
  );
}
