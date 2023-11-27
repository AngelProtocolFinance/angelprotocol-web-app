import BankDetails from "components/BankDetails";
import { useRegState, withStepGuard } from "../StepGuard";
import FormButtons from "./FormButtons";
import useSubmit from "./useSubmit";

function Banking() {
  const { data } = useRegState<5>();
  const { submit, isSubmitting } = useSubmit();

  return (
    <>
      <h2 className="text-center sm:text-left text-xl mb-2">
        Setup your banking details
      </h2>
      <BankDetails
        alreadySubmitted={!!data.banking?.BankStatementFile}
        isSubmitting={isSubmitting}
        onSubmit={submit}
      >
        {(disabled, isSubmitting, refreshRequired) => (
          <FormButtons
            disabled={disabled}
            isSubmitting={isSubmitting}
            refreshRequired={refreshRequired}
          />
        )}
      </BankDetails>
    </>
  );
}

export default withStepGuard(Banking);
