import { useState } from "react";
import BankDetails from "components/BankDetails";
import { useRegState, withStepGuard } from "../StepGuard";
import FormButtons from "./FormButtons";
import useSubmit from "./useSubmit";

function Banking() {
  const { data } = useRegState<5>();

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const { submit, isSubmitting } = useSubmit();

  return (
    <div className="flex flex-col max-sm:items-center gap-4">
      <h2 className="text-center sm:text-left text-xl mb-2">
        Setup your banking details
      </h2>
      <BankDetails
        shouldUpdate={!data.banking?.BankStatementFile || shouldUpdate}
        FormButtons={FormButtons}
        onInitiateUpdate={() => setShouldUpdate(true)}
        isSubmitting={isSubmitting}
        onSubmit={submit}
      />
    </div>
  );
}

export default withStepGuard(Banking);
