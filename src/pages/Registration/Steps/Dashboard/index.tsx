import { useNavigate } from "react-router-dom";
import { Documentation } from "services/types";
import { steps } from "pages/RegistrationV2/routes";
import {
  useRegState,
  withStepGuard,
} from "services/aws/registration/StepGuard";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";
import useSubmit from "./useSubmit";

function Dashboard() {
  const { data } = useRegState<5>();
  const { submit, isSubmitting } = useSubmit();
  const navigate = useNavigate();

  const { documentation, status } = data;
  const cantBeEdited = !(status === "Inactive" || status === "Rejected");

  return (
    <div className="flex flex-col gap-4 items-center h-full w-full">
      {cantBeEdited ? (
        <>
          <h3 className="text-3xl fond-bold">
            Thank you for submitting your application!
          </h3>
          <span>We will notify you by email once the review is complete</span>
        </>
      ) : (
        <>
          <h3 className="text-3xl font-bold">Necessary Information</h3>
          <span>
            Please complete all the following steps to be able to create your
            endowment
          </span>
          <div className="w-full md:w-2/3 flex flex-col items-center gap-4">
            <Step
              title="Contact Details"
              onClick={() =>
                navigate(`../${steps.contact}`, { state: data.init })
              }
              disabled={isSubmitting}
            />
            <Step
              title="Documentation"
              onClick={() => navigate(`../${steps.doc}`, { state: data.init })}
              disabled={isSubmitting}
              customStatus={`Level ${getDocLevel(documentation)}`}
            />
            <Step
              title="Additional Information"
              onClick={() =>
                navigate(`../${steps.profile}`, { state: data.init })
              }
              disabled={isSubmitting}
            />
            <Step
              title="Wallet Address"
              onClick={() =>
                navigate(`../${steps.wallet}`, { state: data.init })
              }
              disabled={isSubmitting}
            />
          </div>
        </>
      )}
      <EndowmentStatus
        onSubmit={() => submit(data)}
        status={status}
        endowId={data.endowId}
      />
    </div>
  );
}

function getDocLevel({ financialStatements, annualReports }: Documentation) {
  let level = 1;
  if (financialStatements.length > 0) level++;
  if (annualReports.length > 0) level++;
  return level;
}

export default withStepGuard(Dashboard);
