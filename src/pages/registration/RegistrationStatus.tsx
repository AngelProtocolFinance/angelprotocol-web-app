import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registration } from "types/routes";
import Action from "../../components/ActionButton/Action";
import maskAddress from "helpers/maskAddress";
import { useGetCharityDataQuery } from "services/aws/charity";
import { useGetter, useSetter } from "store/accessors";
import { updateUserData } from "services/user/userSlice";
import { User } from "services/user/types";

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
    (dest: string) => () => history.push(dest),
    [history]
  );

  return (
    <div className="">
      <div className="necessary-information">
        <div className="">
          <h3 className="text-3xl font-bold">Necessary Information</h3>
          <span className="">
            Please complete all the following steps to be able to create your
            endowment
          </span>
        </div>
        <div className="infor-status my-2">
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-1/2">
            <div className="status text-left font-bold">
              <p className="">Step #1: Contact Details</p>
              <p className="status-text uppercase text-green-500">Complete</p>
            </div>
            <div className="">
              <Action
                classes="bg-yellow-blue w-40 h-10"
                onClick={navigate(registration.detail)}
                title="Change"
                disabled={user.PK === ""}
              />
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-1/2">
            <div className="status text-left font-bold">
              <p className="">Step #2: Wallet Address</p>
              {status.wallet_address ? (
                <p className="status-text uppercase text-green-500">Complete</p>
              ) : (
                <p className="status-text uppercase text-yellow-500">Missing</p>
              )}
            </div>
            <div className="">
              <Action
                classes={
                  status.wallet_address
                    ? "bg-dark-grey w-40 h-10"
                    : "bg-thin-blue w-40 h-10"
                }
                onClick={navigate(registration.wallet_check)}
                title={status.wallet_address ? "Completed" : "Continue"}
                disabled={user.PK === ""}
              />
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-1/2">
            <div className="status text-left font-bold">
              <p className="">Step #3: Documentation</p>
              {status.document === 2 && (
                <p className="status-text uppercase text-green-500">Complete</p>
              )}
              {status.document === 1 && (
                <p className="status-text uppercase text-yellow-500">
                  Under Review
                </p>
              )}
              {status.document === 0 && (
                <p className="status-text uppercase text-yellow-500">Missing</p>
              )}
            </div>
            <div className="">
              <Action
                onClick={() =>
                  history.push({
                    pathname: registration.upload_docs,
                    state: {
                      data: data?.Registration,
                    },
                  })
                }
                classes={
                  status.document === 2
                    ? "bg-dark-grey w-40 h-10"
                    : status.document === 1
                    ? "bg-orange w-40 h-10"
                    : "bg-thin-blue w-40 h-10"
                }
                title={
                  status.document === 2
                    ? "Completed"
                    : status.document === 1
                    ? "Under Review"
                    : "Continue"
                }
                disabled={
                  user.PK === "" ||
                  !(user.TerraWallet || data?.Metadata?.TerraWallet)
                }
              />
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-1/2">
            <div className="status text-left font-bold">
              <p className="">Status of Your Endowment</p>
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
            <div className="">
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
    document:
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
