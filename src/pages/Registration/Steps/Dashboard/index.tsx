import { Navigate } from "react-router-dom";
import { CompleteRegistration } from "pages/Registration/types";
import routes from "pages/Registration/routes";
import { useSubmitMutation } from "services/aws/registration";
import Prompt from "components/Prompt";
import useErrorHandler from "hooks/useErrorHandler";
import { chainIds } from "constants/chains";
import { useRegState, withStepGuard } from "../StepGuard";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";

function Dashboard() {
  const { data } = useRegState<4>();

  const [submitApplication, { isLoading: isSubmitting }] = useSubmitMutation();
  const { handleError, showModal } = useErrorHandler(
    "Registration submit application"
  );

  const submit = async ({ init }: CompleteRegistration) => {
    await submitApplication({
      ref: init.reference,
      chain_id: chainIds.juno,
    })
      .unwrap()
      .then(() => {
        showModal(Prompt, {
          type: "success",
          headline: "Submission",
          title: "Submitted for review",
          children: <>Your application has been submitted</>,
        });
      })
      .catch(handleError);
  };

  const { documentation, status } = data;
  const isStepDisabled = isSubmitting || status === "Under Review";

  if (status === "Active") {
    return <Navigate to={`../../${routes.success}`} state={data} />;
  }

  return (
    <div className="grid">
      <h3 className="text-lg font-bold mb-2">Summary</h3>
      <p className="text-sm mb-8">
        {status === "Inactive" && //keep bottom margin
          "Please confirm that each step has been correctly completed so that your organization can be properly registered."}
      </p>

      <Step num={1} disabled={isStepDisabled} />
      <Step
        num={2}
        disabled={isStepDisabled}
        status={`Level ${documentation.level}`}
      />
      <Step num={3} disabled={isStepDisabled} />

      <EndowmentStatus
        isSubmitting={isSubmitting}
        onSubmit={() => submit(data)}
        status={status}
        endowId={data.endowId}
        classes="mt-6"
      />
    </div>
  );
}

export default withStepGuard(Dashboard);
