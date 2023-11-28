import BankDetails from "components/BankDetails";
import { useRegState, withStepGuard } from "../StepGuard";
import FormButtons from "./FormButtons";
import useSubmit from "./useSubmit";

function Banking() {
  const { data } = useRegState<5>();
  const { submit, isSubmitting } = useSubmit();

  return (
    <div className="flex flex-col max-sm:items-center gap-4">
      <h2 className="text-center sm:text-left text-xl mb-2">
        Setup your banking details
      </h2>
      <BankDetails
        alreadySubmitted={!!data.banking?.BankStatementFile}
        isSubmitting={isSubmitting}
        onSubmit={submit}
      >
        {(disabled, isSubmitting, newRequirementsAdded, refreshRequired) => (
          <FormButtons
            disabled={disabled}
            isSubmitting={isSubmitting}
            newRequirementsAdded={newRequirementsAdded}
            refreshRequired={refreshRequired}
          />
        )}
      </BankDetails>
    </div>
  );
}

export default withStepGuard(Banking);
