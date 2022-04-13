import Loader from "components/Loader/Loader";
import { app, site } from "constants/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { Button } from "../common";
import routes from "../routes";
import EndowmentCreated from "./EndowmentCreated";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.ContactPerson.PK) {
      // TODO: check where to move this logic, since it is similar to useRehydrateUserData
      const newUserData = JSON.parse(localStorage.getItem("userData") || "{}");
      dispatch(updateUserData(newUserData));
    }
    setLoading(false);
  }, [user, dispatch]);

  const state = getRegistrationState(user);

  const dataSubmitted = user.Registration.RegistrationStatus !== "Not Complete";

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

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
      {user.Registration.RegistrationStatus === "Active" && (
        <EndowmentStatus
          registrationStatus={user.Registration.RegistrationStatus}
          walletAddress={user.Metadata.TerraWallet}
          onClick={() => console.log("Create endowment clicked")}
        />
      )}
      {user.Registration.RegistrationStatus === "Complete" && (
        <EndowmentCreated charityName={user.Registration.CharityName} />
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

function getRegistrationState(user: User): RegistrationState {
  return {
    stepOne: { completed: !!user.ContactPerson.PK },
    stepTwo: { completed: !!user.Metadata.TerraWallet },
    stepThree: getStepThree(user),
    stepFour: {
      completed:
        !!user.Metadata.CharityLogo?.sourceUrl &&
        !!user.Metadata.Banner?.sourceUrl &&
        !!user.Metadata.CharityOverview,
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

function getStepThree(user: User): DocumentationStep {
  const levelOneDataExists =
    !!user.Registration.ProofOfIdentity?.sourceUrl &&
    !!user.Registration.ProofOfRegistration?.sourceUrl &&
    !!user.Registration.Website;

  const levelTwoDataExists =
    !!user.Registration.FinancialStatements?.length &&
    (user.Registration.UN_SDG || -1) >= 0;

  const levelThreeDataExists =
    !!user.Registration.AuditedFinancialReports?.length;

  const level: DocumentationLevel = levelOneDataExists
    ? levelTwoDataExists
      ? levelThreeDataExists
        ? 3
        : 2
      : 1
    : 0;

  return { completed: levelOneDataExists, level };
}
