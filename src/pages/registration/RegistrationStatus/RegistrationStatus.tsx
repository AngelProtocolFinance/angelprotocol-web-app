import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registration } from "types/routes";
import Action from "../../../components/ActionButton/Action";
import maskAddress from "helpers/maskAddress";
import { useGetCharityDataQuery } from "services/aws/charity";
import { useGetter, useSetter } from "store/accessors";
import { updateUserData } from "services/user/userSlice";
import { User } from "services/user/types";
import Step, { DocumentationStep } from "./Step";

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
    <div>
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold">Necessary Information</h3>
        <span>
          Please complete all the following steps to be able to create your
          endowment
        </span>
        <div className="flex flex-col gap-4 items-center my-2">
          <Step
            title="Step #1: Contact Details"
            onClick={navigate(registration.detail)}
            isComplete
          />
          <Step
            title="Step #2: Wallet Address"
            onClick={navigate(registration.detail)}
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
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-1/2">
            <div className="status text-left font-bold">
              <p>Status of Your Endowment</p>
              {status.endowment === 0 && (
                <p className="status-text uppercase text-yellow-500">
                  Available soon
                </p>
              )}
              {status.endowment === 1 && (
                <p className="status-text uppercase text-green-500">
                  Available
                </p>
              )}
            </div>
            <div>
              {status.endowment === 2 ? (
                <p className="text-green-500 uppercase">
                  Created:{" "}
                  <span>{maskAddress(data?.Metadata?.TerraWallet)}</span>
                </p>
              ) : (
                <Action
                  classes={
                    status.endowment === 1
                      ? "bg-green-500 w-40 h-10"
                      : "bg-thin-blue w-40 h-10"
                  }
                  onClick={navigate(registration.wallet_check)}
                  title="Create"
                  disabled={status.endowment === 0 || user.PK === ""}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <Action
          classes="bg-thin-blue w-64 h-10"
          title={"Go to " + user.CharityName + "'s profile"}
          onClick={navigate(registration.charity_profile)}
          disabled={!status.completed || user.PK === ""}
        />
        <p className="mt-3 text-sm uppercase">coming soon</p>
      </div>
      <ToastContainer />
    </div>
  );
}

function getStatus(user: User, data: any) {
  return {
    wallet_address: !!data?.Metadata?.TerraWallet || user.TerraWallet,
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
    endowment:
      data?.Metadata?.EndowmentStatus === "Active"
        ? 2
        : user.IsMetaDataCompleted
        ? 1
        : 0,
    completed: user?.RegistrationStatus === "Complete",
  };
}
