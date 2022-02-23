import { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useGetCharityDataQuery } from "services/aws/charity";
import { User } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import Button from "../Button";
import routes from "../routes";
import Step, { DocumentationStep } from "./Step";
import { RegistrationStatus, ReviewStatus } from "./types";

export default function Dashboard() {
  //url is app/register/status
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

  const status = useMemo(() => getStatus(user, data), [user, data]);

  const navigate = (dest: string) => () => history.push(dest);

  const canSubmit = !!user.PK && user.TerraWallet;

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h3 className="text-3xl font-bold">Necessary Information</h3>
      <span>
        Please complete all the following steps to be able to create your
        endowment
      </span>
      <div className="w-full md:w-3/5 xl:w-1/2 flex flex-col items-center gap-4">
        <Step
          title="Step #1: Contact Details"
          onClick={navigate(routes.contactDetails)}
          isComplete
        />
        <Step
          title="Step #2: Wallet Address"
          onClick={navigate(routes.wallet)}
          isComplete={status.stepTwoComplete}
        />
        <DocumentationStep
          title="Step #3: Documentation"
          onClick={navigate(routes.uploadDocs)}
          isComplete={status.stepThreeComplete}
          // TODO: implement level logic
          level={1}
        />
        <Step
          title="Step #4: Additional Information"
          onClick={navigate(routes.additionalInformation)}
          isComplete={status.stepFourComplete}
        />
        <Button
          className={`w-full h-10 bg-yellow-blue`}
          onClick={() => console.log("submit")}
          disabled={canSubmit}
        >
          Submit for review
        </Button>
      </div>
      {status.reviewStatus === ReviewStatus.Complete && (
        <Button
          className="bg-thin-blue min-w-fit h-10 mt-10 px-5"
          onClick={navigate(routes.charityProfile)}
          title="Available soon"
        >
          {"Go to " + user.CharityName + "'s profile"}
        </Button>
      )}
    </div>
  );
}

function getStatus(user: User, data: any): RegistrationStatus {
  // const documentationStatus =
  //   (user.ProofOfIdentityVerified ||
  //     data?.Registration?.ProofOfIdentityVerified) &&
  //   (user.ProofOfEmploymentVerified ||
  //     data?.Registration?.ProofOfEmploymentVerified) &&
  //   (user.EndowmentAgreementVerified ||
  //     data?.Registration?.EndowmentAgreementVerified)
  //     ? DocumentationStatus.Verified
  //     : (user.ProofOfEmployment || data?.Registration?.ProofOfEmployment) &&
  //       (user.ProofOfIdentity || data?.Registration?.ProofOfIdentity) &&
  //       (user.EndowmentAgreement || data?.Registration?.EndowmentAgreement)
  //     ? DocumentationStatus.Submitted
  //     : DocumentationStatus.Missing;

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
    // documentationStatus,
  };
}
