import { useNavigate } from "react-router-dom";
import { steps } from "pages/RegistrationV2/routes";
import { useRegState, withStepGuard } from "../StepGuard";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";
import useSubmit from "./useSubmit";

function Dashboard() {
  const { data } = useRegState<5>();
  const { submit, isSubmitting } = useSubmit();
  const navigate = useNavigate();

  const { documentation, status } = data;
  const cantBeEdited = !(status === "Inactive" || status === "Rejected");
  const isStepDisabled = isSubmitting || cantBeEdited;

  return (
    <div className="flex flex-col gap-4 items-center h-full w-full">
      <h3 className="text-3xl font-bold">Necessary Information</h3>
      <span>
        Please complete all the following steps to be able to create your
        endowment
      </span>
      <div className="w-full md:w-2/3 flex flex-col items-center gap-4">
        <Step
          title="Contact Details"
          onClick={() => navigate(`../${steps.contact}`, { state: data.init })}
          disabled={isStepDisabled}
        />
        <Step
          title="Documentation"
          onClick={() => navigate(`../${steps.doc}`, { state: data.init })}
          disabled={isStepDisabled}
          customStatus={`Level ${documentation.level}`}
        />
        <Step
          title="Additional Information"
          onClick={() => navigate(`../${steps.profile}`, { state: data.init })}
          disabled={isStepDisabled}
        />
        <Step
          title="Wallet Address"
          onClick={() => navigate(`../${steps.wallet}`, { state: data.init })}
          disabled={isStepDisabled}
        />
      </div>

      <EndowmentStatus
        isSubmitting={isSubmitting}
        onSubmit={() => submit(data)}
        status={status}
        endowId={data.endowId}
      />
    </div>
  );
}

export default withStepGuard(Dashboard);
