import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import { app, site } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";
import EndowmentCreated from "./EndowmentCreated";
import EndowmentStatus from "./EndowmentStatus";
import ProgressIndicator from "./ProgressIndicator";
import Step from "./Step";
import getRegistrationState from "./getRegistrationState";
import useSubmit from "./useSubmit";

export default function Dashboard() {
  const navigate = useNavigate();
  const charity = useGetter((state) => state.charity);
  const { submit, isSubmitting } = useSubmit();

  const state = getRegistrationState(charity);

  const dataSubmitted = charity.Registration.RegistrationStatus !== "Inactive";

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <ProgressIndicator />
      <h3 className="text-3xl font-bold">Necessary Information</h3>
      <span>
        Please complete all the following steps to be able to create your
        endowment
      </span>
      <div className="w-full md:w-2/3 flex flex-col items-center gap-4">
        <Step
          title="Step #1: Contact Details"
          onClick={() =>
            navigate(`${site.app}/${app.register}/${routes.contactDetails}`)
          }
          disabled={dataSubmitted || isSubmitting}
          completed
        />
        <Step
          title="Step #2: Wallet Address"
          onClick={() =>
            navigate(`${site.app}/${app.register}/${routes.wallet}`)
          }
          disabled={dataSubmitted || isSubmitting}
          completed={state.stepTwo.completed}
        />
        <Step
          title="Step #3: Documentation"
          onClick={() =>
            navigate(`${site.app}/${app.register}/${routes.documentation}`)
          }
          disabled={dataSubmitted || isSubmitting}
          completed={state.stepThree.completed}
          // TODO: implement level logic
          statusComplete={
            state.stepThree.completed && `Level ${state.stepThree.tier}`
          }
        />
        <Step
          title="Step #4: Additional Information"
          onClick={() =>
            navigate(
              `${site.app}/${app.register}/${routes.additionalInformation}`
            )
          }
          disabled={dataSubmitted || isSubmitting}
          completed={state.stepFour.completed}
        />
        {!dataSubmitted && (
          <Button
            className="w-full h-10 mt-5 bg-yellow-blue"
            onClick={() => submit(charity)}
            disabled={!state.getIsReadyForSubmit() || isSubmitting}
          >
            Submit for review
          </Button>
        )}
      </div>
      {charity.Registration.RegistrationStatus === "Active" && (
        <EndowmentStatus
          registrationStatus={charity.Registration.RegistrationStatus}
          walletAddress={charity.Metadata.TerraWallet}
          onClick={() => console.log("Create endowment clicked")}
        />
      )}
      {charity.Registration.RegistrationStatus === "Approved" && (
        <EndowmentCreated charityName={charity.Registration.CharityName} />
      )}
    </div>
  );
}
