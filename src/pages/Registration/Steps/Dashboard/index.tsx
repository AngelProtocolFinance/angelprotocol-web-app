import Prompt from "components/Prompt";
import { regRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import type { CompleteRegistration } from "pages/Registration/types";
import { Navigate } from "react-router-dom";
import { useSubmitMutation } from "services/aws/registration";
import { useRegState, withStepGuard } from "../StepGuard";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";

function Dashboard() {
  const { data } = useRegState<6>();

  const [submitApplication, { isLoading: isSubmitting }] = useSubmitMutation();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  const submit = async ({ init }: CompleteRegistration) => {
    try {
      await submitApplication(init.reference).unwrap();
      if (window.hasOwnProperty("lintrk")) {
        (window as any).lintrk("track", { conversion_id: 12807754 });
      }
      showModal(Prompt, {
        type: "success",
        headline: "Submission",
        title: "Submitted for review",
        children: (
          <>
            Your application has been submitted. We will get back to you soon!
          </>
        ),
      });
    } catch (err) {
      handleError(err, { context: "submitting registration" });
    }
  };

  const { status } = data;
  const isStepDisabled = isSubmitting || status === "Under Review";

  if (status === "Active") {
    return <Navigate to={`../../${regRoutes.success}`} state={data} />;
  }

  return (
    <div className="grid">
      <h3 className="text-lg mb-2">Summary</h3>
      <p className="text-sm mb-8">
        {status === "Inactive" && //keep bottom margin
          "If you are happy with the details you have submitted, click continue. If you wish to check, click update as required."}
      </p>

      <Step num={1} disabled={isStepDisabled} />
      <Step num={2} disabled={isStepDisabled} />
      <Step num={3} disabled={isStepDisabled} />
      <Step num={4} disabled={isStepDisabled} />
      <Step num={5} disabled={isStepDisabled} />

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
