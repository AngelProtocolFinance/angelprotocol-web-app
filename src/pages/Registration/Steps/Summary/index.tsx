import { useNavigate } from "react-router-dom";
import { Documentation } from "services/aws/registration/types";
import {
  useRegState,
  withStepGuard,
} from "services/aws/registration/StepGuard";
import { appRoutes } from "constants/routes";
import routes from "../../routes";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";
import useSubmit from "./useSubmit";

function Dashboard() {
  const { data } = useRegState<5>();
  const { submit, isSubmitting } = useSubmit();
  const navigate = useNavigate();

  const { documentation } = data;
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
                navigate(`${appRoutes.register}/${routes.contactDetails}`)
              }
              disabled={isSubmitting}
            />
            <Step
              title="Documentation"
              onClick={() =>
                navigate(`${appRoutes.register}/${routes.documentation}`)
              }
              disabled={isSubmitting}
              customStatus={`Level ${getDocLevel(documentation)}`}
            />
            <Step
              title="Additional Information"
              onClick={() =>
                navigate(
                  `${appRoutes.register}/${routes.additionalInformation}`
                )
              }
              disabled={isSubmitting}
            />
            <Step
              title="Wallet Address"
              onClick={() => navigate(`${appRoutes.register}/${routes.wallet}`)}
              disabled={isSubmitting}
            />
          </div>
        </>
      )}
      <EndowmentStatus isLoading={isSubmitting} onSubmit={() => submit(data)} />
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
