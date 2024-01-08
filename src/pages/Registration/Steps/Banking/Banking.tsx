import BankDetails from "components/BankDetails";
import { withStepGuard } from "../StepGuard";
import FormButtons from "./FormButtons";
import useSubmit from "./useSubmit";

function Banking() {
  const { submit } = useSubmit();

  return (
    <div className="flex flex-col max-sm:items-center gap-4">
      <h2 className="text-center sm:text-left text-xl mb-2">
        Setup your banking details
      </h2>
      <BankDetails FormButtons={FormButtons} onSubmit={submit} />
    </div>
  );
}

export default withStepGuard(Banking);
