import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "../types";
import { useAdminResources } from "pages/Admin/Guard";
import { useLatestBlockQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import SubmitLocked from "./SubmitLocked";
import WithdrawButton from "./WithdrawButton";

export default function Submit() {
  const { endow_type, maturity_height } = useAdminResources<"charity">();
  const {
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<WV>();
  const queryState = useLatestBlockQuery(null);
  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  const type = getValues("type");
  if (type === "liquid") {
    return <WithdrawButton disabled={isSubmitDisabled} />;
  }

  //check maturity when locked
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Checking account maturity...",
        error: "Failed to check account maturity",
      }}
    >
      {(height) => (
        <SubmitLocked
          endowment={{ endow_type, maturity_height }}
          height={+height}
          isSubmitDisabled={isSubmitDisabled}
        />
      )}
    </QueryLoader>
  );
}
