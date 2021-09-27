import { useHistory } from "react-router-dom";
import { register } from "types/routes";

const RegistrationStatus = () => {
  //url is app/register/status
  const history = useHistory();
  const userData: any = JSON.parse(localStorage.getItem("userData") || "{}");
  const status = {
    contact_details: "complete",
    wallet_address: "missing",
    document: "missing",
    endwment: "not available",
    completed: false,
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
          <div className="py-2 mx-auto flex justify-between xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Step #1: Contact Details</span>
              <br />
              <span className="status-text uppercase text-green-500">
                {status.contact_details}
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
          <div className="py-2 mx-auto flex justify-between xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Step #2: Wallet Address</span>
              <br />
              <span className="status-text uppercase text-yellow-600">
                {status.wallet_address}
              </span>
            </div>
            <div className="">
              <button className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
                Continue
              </button>
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Step #3: Documentation</span>
              <br />
              <span className="status-text uppercase text-yellow-600">
                {status.document}
              </span>
            </div>
            <div className="">
              <button className="bg-gray-300 w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
                Change
              </button>
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Status of Your Endwment</span>
              <br />
              <span className="status-text uppercase text-red-600">
                {status.endwment}
              </span>
            </div>
            <div className="">
              <button className="bg-gray-300 w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
                create
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
          <div className="py-2 mx-auto flex justify-between xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Step #1: Contact Details</span>
              <br />
              <span className="status-text uppercase text-green-500">
                complete
              </span>
            </div>
            <div className="">
              <button className="bg-yellow-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
                Change
              </button>
            </div>
          </div>
          <div className="py-2 mx-auto flex justify-between xl:w-2/5">
            <div className="status text-left font-bold">
              <span className="">Step #2: Wallet Address</span>
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
          Go to {userData.charityName}'s profile
        </button>
      </div>
    </div>
  );
};

export default RegistrationStatus;
