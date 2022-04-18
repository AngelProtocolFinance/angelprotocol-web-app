import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import { app, site } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";
import { CharityData } from "../store";
import EndowmentCreated from "./EndowmentCreated";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";

export default function Dashboard() {
  const navigate = useNavigate();
  const charity = useGetter((state) => state.charity);

  const state = getRegistrationState(charity);

  const dataSubmitted =
    charity.Registration.RegistrationStatus !== "Not Complete";

  return (
    <div className="flex flex-col gap-4 items-center w-full">
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
          disabled={dataSubmitted}
          completed
        />
        <Step
          title="Step #2: Wallet Address"
          onClick={() =>
            navigate(`${site.app}/${app.register}/${routes.wallet}`)
          }
          disabled={dataSubmitted}
          completed={state.stepTwo.completed}
        />
        <Step
          title="Step #3: Documentation"
          onClick={() =>
            navigate(`${site.app}/${app.register}/${routes.documentation}`)
          }
          disabled={dataSubmitted}
          completed={state.stepThree.completed}
          // TODO: implement level logic
          statusComplete={
            state.stepThree.completed && `Level ${state.stepThree.level}`
          }
        />
        <Step
          title="Step #4: Additional Information"
          onClick={() =>
            navigate(
              `${site.app}/${app.register}/${routes.additionalInformation}`
            )
          }
          disabled={dataSubmitted}
          completed={state.stepFour.completed}
        />
        {!dataSubmitted && (
          <Button
            className="w-full h-10 mt-5 bg-yellow-blue"
            onClick={() => console.log("submit")}
            disabled={!state.getIsReadyForSubmit()}
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
      {charity.Registration.RegistrationStatus === "Complete" && (
        <EndowmentCreated charityName={charity.Registration.CharityName} />
      )}
    </div>
  );
}

type DocumentationLevel = 0 | 1 | 2 | 3;

type RegistrationStep = { completed: boolean };

type DocumentationStep = RegistrationStep & { level: DocumentationLevel };

type RegistrationState = {
  stepOne: RegistrationStep;
  stepTwo: RegistrationStep;
  stepThree: DocumentationStep;
  stepFour: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};

function getRegistrationState(charity: CharityData): RegistrationState {
  return {
    stepOne: { completed: !!charity.ContactPerson.PK },
    stepTwo: { completed: !!charity.Metadata.TerraWallet },
    stepThree: getStepThree(charity),
    stepFour: {
      completed:
        !!charity.Metadata.CharityLogo?.sourceUrl &&
        !!charity.Metadata.Banner?.sourceUrl &&
        !!charity.Metadata.CharityOverview,
    },
    getIsReadyForSubmit: function () {
      return (
        this.stepOne.completed &&
        this.stepTwo.completed &&
        this.stepThree.completed &&
        this.stepFour.completed
      );
    },
  };
}

function getStepThree(charity: CharityData): DocumentationStep {
  const levelOneDataExists =
    !!charity.Registration.ProofOfIdentity?.sourceUrl &&
    !!charity.Registration.ProofOfRegistration?.sourceUrl &&
    !!charity.Registration.Website;

  const levelTwoDataExists =
    !!charity.Registration.FinancialStatements?.length &&
    (charity.Registration.UN_SDG || -1) >= 0;

  const levelThreeDataExists =
    !!charity.Registration.AuditedFinancialReports?.length;

  const level: DocumentationLevel = levelOneDataExists
    ? levelTwoDataExists
      ? levelThreeDataExists
        ? 3
        : 2
      : 1
    : 0;

  return { completed: levelOneDataExists, level };
}
