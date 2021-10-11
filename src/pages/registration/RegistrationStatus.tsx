import { useEffect } from "react";
import { useGetCharityDataQuery } from "api/charityAPIs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { TStore } from "Redux/store";
import { register } from "types/routes";

const RegistrationStatus = () => {
  //url is app/register/status
  const history = useHistory();
  const { userData } = useSelector((state: TStore) => state.user);
  console.log("userData => ", userData);
  const { data, error, isLoading, isFetching, refetch } =
    useGetCharityDataQuery(userData.PK);

  useEffect(() => {
    if (error) {
      const messageData: any = error;
      toast.error(messageData.data.message);
    }
  });

  const status = {
    contact_details: 0,
    wallet_address: 1,
    document: data?.Metadata ? 0 : 1,
    endowment:
      data?.Metadata?.EndowmentStatus === "Active" ? 0 : data?.Metadata ? 1 : 2,
    completed:
      data?.Metadata &&
      data?.Metadata?.EndowmentStatus === "Active" &&
      data?.Wallet,
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
              <span className="">Step #1: Contact Details</span>
              <br />
              <span className="status-text uppercase text-green-500">
                Complete
              </span>
            </div>
            <div className="">
              <button
                className="bg-yellow-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
                onClick={() => {
                  history.push({
                    pathname: register.detail,
                  });
                }}
              >
                Change
              </button>
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Step #2: Wallet Address</span>
              <br />
              <span className="status-text uppercase text-yellow-600">
                {status.wallet_address === 0 ? "Complete" : "Missing"}
              </span>
            </div>
            <div className="">
              <button
                className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
                onClick={() => {
                  history.push({
                    pathname: register.wallet_check,
                  });
                }}
              >
                {status.wallet_address === 0 ? "Change" : "Continue"}
              </button>
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Step #3: Documentation</span>
              <br />
              <span className="status-text uppercase text-yellow-600">
                {status.document === 0 ? "Complete" : "Missing"}
              </span>
            </div>
            <div className="">
              <button
                className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
                onClick={() => {
                  history.push({
                    pathname: register.upload_docs,
                  });
                }}
              >
                {status.document === 0 ? "Change" : "Continue"}
              </button>
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Status of Your Endowment</span>
              <br />
              <span className="status-text uppercase text-red-600">
                {status.endowment === 0
                  ? "Complete"
                  : status.endowment === 1
                  ? "Missing"
                  : "Not available"}
              </span>
            </div>
            <div className="">
              <button
                className="disabled:bg-gray-300 bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
                disabled={status.endowment === 2}
              >
                {status.endowment === 0 ? "Complete" : "Continue"}
              </button>
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
              <span className="">Step #1: Charity Profile</span>
              <br />
              <span className="status-text uppercase text-green-500">
                complete
              </span>
            </div>
            <div className="">
              <button
                className="bg-yellow-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
                onClick={() => history.push(register.charity_profile)}
              >
                Change
              </button>
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between md:w-3/5 xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Step #2: Key Person Profile</span>
              <br />
              <span className="status-text uppercase text-yellow-600">
                Missing
              </span>
            </div>
            <div className="">
              <button className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="disabled:bg-gray-300 bg-thin-blue w-64 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
          onClick={() => history.push(register.charity_profile)}
          disabled={!status.completed}
        >
          Go to {userData.CharityName}'s profile
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationStatus;
