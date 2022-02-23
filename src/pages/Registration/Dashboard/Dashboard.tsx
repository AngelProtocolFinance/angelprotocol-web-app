import { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useGetCharityDataQuery } from "services/aws/charity";
import { User } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import Button from "../Button";
import routes from "../routes";
import EndowmentStatus from "./EndowmentStatus";
import Step, { DocumentationStep } from "./Step";
import { RegistrationStatus, ReviewStatus } from "./types";

export default function Dashboard() {
  const history = useHistory();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const { data, error } = useGetCharityDataQuery(user.PK);

  useEffect(() => {
    if (!user.PK) {
      const newUserData = JSON.parse(localStorage.getItem("userData") || "{}");
      dispatch(updateUserData(newUserData));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user.IsMetaDataCompleted || user.IsKeyPersonCompleted) {
      history.go(0);
    }
  }, [user.IsMetaDataCompleted, user.IsKeyPersonCompleted, history]);

  useEffect(() => {
    if (error) {
      const messageData: any = error;
      console.error(messageData?.data?.message || "something went wrong");
    }
  }, [error]);

  const status = useMemo(() => getRegistrationStatus(user, data), [user, data]);

  const stepsDisabled = status.reviewStatus !== ReviewStatus.None;

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
          onClick={() => history.push(routes.contactDetails)}
          disabled={stepsDisabled}
          isComplete
        />
        <Step
          title="Step #2: Wallet Address"
          onClick={() => history.push(routes.wallet)}
          disabled={stepsDisabled}
          isComplete={status.stepTwoComplete}
        />
        <DocumentationStep
          title="Step #3: Documentation"
          onClick={() => history.push(routes.uploadDocs)}
          disabled={stepsDisabled}
          isComplete={status.stepThreeComplete}
          // TODO: implement level logic
          level={1}
        />
        <Step
          title="Step #4: Additional Information"
          onClick={() => history.push(routes.additionalInformation)}
          disabled={stepsDisabled}
          isComplete={status.stepFourComplete}
        />
        {status.reviewStatus === ReviewStatus.None && (
          <Button
            className={`w-full h-10 mt-5 bg-yellow-blue`}
            onClick={() => console.log("submit")}
            disabled={!status.getReadyForSubmit()}
          >
            Submit for review
          </Button>
        )}
      </div>
      {status.reviewStatus !== ReviewStatus.None && (
        <EndowmentStatus
          registrationStatus={status}
          walletAddress={data?.Metadata?.TerraWallet || user.TerraWallet}
          onClick={() => console.log("Create endowment clicked")}
        />
      )}
      {status.reviewStatus === ReviewStatus.Complete && (
        <Button
          className="bg-thin-blue min-w-fit h-10 mt-5 px-5"
          onClick={() => history.push(routes.charityProfile)}
          title="Available soon"
        >
          {"Go to " + user.CharityName + "'s profile"}
        </Button>
      )}
    </div>
  );
}

function getRegistrationStatus(user: User, data: any): RegistrationStatus {
  return {
    stepOneComplete: !!user.PK,
    stepTwoComplete: !!data?.Metadata?.TerraWallet || user.TerraWallet,
    stepThreeComplete:
      (user.ProofOfEmployment || data?.Registration?.ProofOfEmployment) &&
      (user.ProofOfIdentity || data?.Registration?.ProofOfIdentity) &&
      (user.EndowmentAgreement || data?.Registration?.EndowmentAgreement),
    stepFourComplete: false,
    reviewStatus:
      user?.RegistrationStatus === "Complete"
        ? ReviewStatus.Complete
        : data?.Metadata?.EndowmentStatus === "Active"
        ? ReviewStatus.Available
        : user.IsMetaDataCompleted
        ? ReviewStatus.UnderReview
        : ReviewStatus.None,
    getReadyForSubmit: function () {
      return (
        this.stepOneComplete &&
        this.stepTwoComplete &&
        this.stepThreeComplete &&
        this.stepFourComplete
      );
    },
  };
}
