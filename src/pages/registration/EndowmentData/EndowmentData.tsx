import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registration } from "types/routes";
import Action from "../../../components/ActionButton/Action";
import { useGetCharityDataQuery } from "services/aws/charity";
import { useGetter, useSetter } from "store/accessors";
import { updateUserData } from "services/user/userSlice";
import { User } from "services/user/types";
import Step, { DocumentationStep } from "./Step";
import Status from "./Status";

export default function RegistrationStatus() {
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
      toast.error(messageData?.data?.message || "something went wrong");
    }
  }, [error]);

  const status = useMemo(() => getStatus(user, data), [user, data]);

  const navigate = useCallback(
    (dest: string, state?: unknown) => () => history.push(dest, state),
    [history]
  );

  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-3xl font-bold">Necessary Information</h3>
      <span>
        Please complete all the following steps to be able to create your
        endowment
      </span>
      <Step
        title="Step #1: Contact Details"
        onClick={navigate(registration.detail)}
        isComplete
      />
      <Step
        title="Step #2: Wallet Address"
        onClick={navigate(registration.wallet_check)}
        isComplete={!!status.wallet_address}
      />
      <DocumentationStep
        title="Step #3: Documentation"
        onClick={navigate(registration.upload_docs, {
          data: data?.Registration,
        })}
        isComplete={status.documentationStep === 2}
        // TODO: implement level logic
        level={1}
      />
      <Step
        title="Step #4: Additional Information"
        onClick={navigate(registration.additional_information)}
        isComplete={status.isAdditionalInformationProvided}
      />
      <Status
        endowmentStep={status.endowmentStep}
        walletAddress={data?.Metadata?.TerraWallet}
        onClick={navigate(registration.wallet_check)}
        disabled={status.endowmentStep === 0 || user.PK === ""}
      />
      {status.completed && !!user.PK && (
        <Action
          classes="bg-thin-blue min-w-fit h-10 mt-10 px-5"
          title={"Go to " + user.CharityName + "'s profile"}
          onClick={navigate(registration.charity_profile)}
          tooltip="Available soon"
        />
      )}
      <ToastContainer />
    </div>
  );
}

function getStatus(user: User, data: any) {
  return {
    wallet_address: !!data?.Metadata?.TerraWallet || user.TerraWallet,
    // TODO: turn this into an enum (e.g. [Missing, Pending, Verified])
    documentationStep:
      (user.ProofOfIdentityVerified ||
        data?.Registration?.ProofOfIdentityVerified) &&
      (user.ProofOfEmploymentVerified ||
        data?.Registration?.ProofOfEmploymentVerified) &&
      (user.EndowmentAgreementVerified ||
        data?.Registration?.EndowmentAgreementVerified)
        ? 2
        : (user.ProofOfEmployment || data?.Registration?.ProofOfEmployment) &&
          (user.ProofOfIdentity || data?.Registration?.ProofOfIdentity) &&
          (user.EndowmentAgreement || data?.Registration?.EndowmentAgreement)
        ? 1
        : 0,
    // TODO: turn this into an enum (e.g. [Missing, Pending, Active])
    endowmentStep:
      data?.Metadata?.EndowmentStatus === "Active"
        ? 2
        : user.IsMetaDataCompleted
        ? 1
        : 0,
    // TODO: turn this into an enum (e.g. [In_Progress, Pending, Complete])
    completed: user?.RegistrationStatus === "Complete",
    // TODO: implement logic for checking if additional info is provided
    isAdditionalInformationProvided: false,
  };
}
