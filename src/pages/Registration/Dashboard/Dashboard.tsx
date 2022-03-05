import { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useGetCharityDataQuery } from "services/aws/charity";
import { User } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import Button from "../Button";
import routes from "../routes";
import EndowmentCreated from "./EndowmentCreated";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";
import { RegistrationStatus, ReviewStatus } from "./types";

export default function Dashboard() {
  const history = useHistory();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const { data, error } = useGetCharityDataQuery(user.PK);

  useEffect(() => {
    if (!user.PK) {
      // TODO: check where to move this logic, since it is similar to useRehydrateUserData
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

  const dataSubmitted = status.reviewStatus !== ReviewStatus.None;

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
          disabled={dataSubmitted}
          completed
        />
        <Step
          title="Step #2: Wallet Address"
          onClick={() => history.push(routes.wallet)}
          disabled={dataSubmitted}
          completed={status.stepTwoCompleted}
        />
        <Step
          title="Step #3: Documentation"
          onClick={() => history.push(routes.documentation)}
          disabled={dataSubmitted}
          completed={status.stepThreeCompleted}
          // TODO: implement level logic
          statusComplete={status.stepThreeCompleted && `Level 1`}
        />
        <Step
          title="Step #4: Additional Information"
          onClick={() => history.push(routes.additionalInformation)}
          disabled={dataSubmitted}
          completed={status.stepFourCompleted}
        />
        {status.reviewStatus === ReviewStatus.None && (
          <Button
            className="w-full h-10 mt-5 bg-yellow-blue"
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
        <EndowmentCreated charityName={user?.CharityName} />
      )}
    </div>
  );
}

function getRegistrationStatus(user: User, data: any): RegistrationStatus {
  return {
    stepOneCompleted: !!user.PK,
    stepTwoCompleted: !!data?.Metadata?.TerraWallet || user.TerraWallet,
    stepThreeCompleted:
      (user.ProofOfIdentity || data?.Registration?.ProofOfIdentity) &&
      (user.ProofOfRegistration || data?.Registration?.ProofOfRegistration) &&
      (user.Website || data?.Registration?.Website),
    stepFourCompleted: false,
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
        this.stepOneCompleted &&
        this.stepTwoCompleted &&
        this.stepThreeCompleted &&
        this.stepFourCompleted
      );
    },
  };
}
