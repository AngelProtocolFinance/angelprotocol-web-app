import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "../types";
import { useAdminResources } from "pages/Admin/Guard";
import SubmitLocked from "./SubmitLocked";
import WithdrawButton from "./WithdrawButton";

export default function Submit() {
  const { endow_type, maturity_time } = useAdminResources<"charity">();
  const {
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<WV>();
  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  const type = getValues("type");
  if (type === "liquid") {
    return <WithdrawButton disabled={isSubmitDisabled} />;
  }

  //check maturity when locked
  return (
    <SubmitLocked
      endowment={{ endow_type, maturity_time }}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
}
