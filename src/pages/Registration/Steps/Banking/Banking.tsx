import BankDetails from "components/BankDetails";
import { useRegState, withStepGuard } from "../StepGuard";
import FormButtons from "./FormButtons";
import useSubmit from "./useSubmit";

function Banking() {
  const { data } = useRegState<5>();
  const submit = useSubmit();

  return (
    <BankDetails disabled={!!data.banking?.wise_recipient_id} onSubmit={submit}>
      {(disabled, isSubmitting, refreshRequired) => (
        <FormButtons
          disabled={disabled}
          isSubmitting={isSubmitting}
          refreshRequired={refreshRequired}
        />
      )}
    </BankDetails>
  );
}

export default withStepGuard(Banking);
