import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registration } from "types/routes";
import Action from "../../components/ActionButton/Action";
import maskAddress from "helpers/maskAddress";
import { useGetCharityDataQuery } from "services/aws/charity";
import { useGetter, useSetter } from "store/accessors";
import { updateUserData } from "services/user/userSlice";

const RegistrationStatus = () => {
  //url is app/register/status
  const history = useHistory();
  const dispatch = useSetter();
  let user = useGetter((state) => state.user);
  if (!user.PK) {
    user = JSON.parse(localStorage.getItem("userData") || "{}");
    dispatch(updateUserData(user));
  }

  if (user.IsMetaDataCompleted || user.IsKeyPersonCompleted) {
    history.go(0);
  }
  const { data, error } = useGetCharityDataQuery(user.PK);

  useEffect(() => {
    if (error) {
      const messageData: any = error;
      toast.error(messageData?.data?.message || "something went wrong");
    }
  }, [error]);

  const status = {
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
        ? 0
        : user.IsMetaDataCompleted
        ? 1
        : 2,
    completed: user?.RegistrationStatus === "Complete",
  };

  const navigate = (dest: string) => () => {
    history.push(dest);
  };

  return (
    <div className="">
      <div className="necessary-information">
        <div className="">
          <h3 className="text-3xl font-bold">Necessary Information</h3>
          <span className="">
            You need to complete all the following steps to be able to create
            your endowment
          </span>
        </div>
        <div className="infor-status my-2">
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
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
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <p className="">Step #2: Wallet Address</p>
              {status.wallet_address ? (
                <p className="status-text uppercase text-green-500">Complete</p>
              ) : (
                <p className="status-text uppercase text-yellow-600">Missing</p>
              )}
            </div>
            <div className="">
              <Action
                classes={
                  status.wallet_address
                    ? "bg-yellow-blue w-40 h-10"
                    : "bg-thin-blue w-40 h-10"
                }
                onClick={navigate(registration.wallet_check)}
                title={status.wallet_address ? "Change" : "Continue"}
                disabled={user.PK === ""}
              />
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <p className="">Step #3: Documentation</p>
              {status.document === 2 && (
                <p className="status-text uppercase text-green-500">Complete</p>
              )}
              {status.document === 1 && (
                <p className="status-text uppercase text-yellow-blue">
                  In Review
                </p>
              )}
              {status.document === 0 && (
                <p className="status-text uppercase text-yellow-600">Missing</p>
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
                    ? "bg-yellow-blue w-40 h-10"
                    : "bg-thin-blue w-40 h-10"
                }
                title={status.document === 2 ? "Change" : "Continue"}
                disabled={
                  user.PK === "" ||
                  !(user.TerraWallet || data?.Metadata?.TerraWallet)
                }
              />
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <p className="">Status of Your Endowment</p>
              <p className="status-text uppercase text-red-600">
                {status.endowment === 0
                  ? `Address: ${maskAddress(data?.Metadata?.TerraWallet)}`
                  : status.endowment === 1
                  ? "Available soon"
                  : "Not available"}
              </p>
            </div>
            <div className="">
              <Action
                classes={
                  status.endowment === 2
                    ? "bg-yellow-blue w-40 h-10"
                    : "bg-thin-blue w-40 h-10"
                }
                onClick={navigate(registration.wallet_check)}
                title={status.endowment === 0 ? "Complete" : "Continue"}
                disabled={status.endowment === 2 || user.PK === ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="optional-information my-5">
        <div className="">
          <h3 className="text-3xl font-bold">Optional Information</h3>
          <span className="">
            Without the following information, you will still be able to create
            your endowment but your organization won't appear publicly on our
            platform. You will be able to edit this information at any time.
          </span>
        </div>
        <div className="infor-status my-2">
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <p className="">Step #1: Charity Profile</p>
              {data?.Metadata?.CompanyNumber ? (
                <p className="status-text uppercase text-green-500">complete</p>
              ) : (
                <p className="status-text uppercase text-yellow-600">Missing</p>
              )}
            </div>
            <div className="">
              <Action
                classes={
                  data?.Metadata?.CompanyNumber
                    ? "bg-yellow-blue w-40 h-10"
                    : "bg-thin-blue w-40 h-10"
                }
                onClick={() =>
                  history.push({
                    pathname: registration.charity_profile,
                    state: {
                      data: data?.Metadata,
                    },
                  })
                }
                disabled={user.PK === ""}
                title={data?.Metadata?.CompanyNumber ? "Change" : "Continue"}
              />
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <p className="">Step #2: Key Person Profile</p>
              {data?.KeyPerson ? (
                <p className="status-text uppercase text-green-500">complete</p>
              ) : (
                <p className="status-text uppercase text-yellow-600">Missing</p>
              )}
            </div>
            <div className="">
              <Action
                classes={
                  data?.KeyPerson
                    ? "bg-yellow-blue w-40 h-10"
                    : "bg-thin-blue w-40 h-10"
                }
                onClick={() =>
                  history.push({
                    pathname: registration.key_person,
                    state: {
                      data: data?.KeyPerson,
                    },
                  })
                }
                title={data?.KeyPerson ? "Change" : "Continue"}
                disabled={user.PK === ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Action
          classes="bg-thin-blue w-64 h-10"
          title={"Go to " + user.CharityName + "'s profile"}
          onClick={navigate(registration.charity_profile)}
          disabled={!status.completed || user.PK === ""}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationStatus;
