import { useHistory } from "react-router-dom";
import queryString from "query-string";
import jwtDecode from "jwt-decode";
import { FaCheck } from "react-icons/fa";
import { registerRoutes } from "types/types";
import { updateNamespaceExportDeclaration } from "typescript";

const VerifiedEmail = () => {
  const history = useHistory();
  const location = history.location;
  const query: any = queryString.parse(location.search);
  console.log("url query => ", query);
  const userData: any = jwtDecode(query?.token);
  // get userData details and save it to Redux or localstorage

  return (
    <div>
      <div className="flex justify-center rounded-xl mb-5">
        <FaCheck className="text-4xl text-yellow-blue" />
      </div>
      <div>
        <span className="text-2xl font-bold">Thank you for registering.</span>
        <br />
        <span className="text-2xl font-bold">
          {userData.charityName}, {userData.firstName}!
        </span>
        <br />
        <br />
        <span className="text-2xl font-bold">
          Your registration reference is{" "}
        </span>
        <br />
        <span className="text-2xl font-bold text-yellow-600">
          {userData.unique_id}
        </span>
      </div>
      <div className="my-10">
        <span className="text-base">
          We have sent it to your email address for your future reference.
        </span>
      </div>
      <div className="mb-2">
        <button
          className="bg-thin-blue w-48 h-12 rounded-xl uppercase text-base font-bold text-white mb-3"
          onClick={() => history.push(`../${registerRoutes.detail}`)}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default VerifiedEmail;
