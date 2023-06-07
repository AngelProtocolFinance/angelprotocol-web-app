import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "../types";
import { useAdminResources } from "pages/Admin/Guard";
import SubmitLocked from "./SubmitLocked";
import WithdrawButton from "./WithdrawButton";

export default function Submit() {
  const { endowType } = useAdminResources<"charity">();
  const {
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<WV>();
  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  const type = getValues("type");
  if (type === "liquid") {
    return <WithdrawButton disabled={isSubmitDisabled} />;
  }
  //locked withdraw form not visible to normal endowments when not matured
  return (
    <SubmitLocked
      endowment={{ endowType }}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
}
