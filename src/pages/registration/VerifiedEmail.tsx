import { useHistory } from "react-router-dom";
import queryString from "query-string";
import checkedIcon from "assets/images/Iconoir-1.png";
import jwtDecode from "jwt-decode";
import { register_routes } from "types/types";

const VerifiedEmail = () => {
  const history = useHistory();
  const location = history.location;
  const query: any = queryString.parse(location.search);
  console.log("url query => ", query);
  const userData: any = jwtDecode(query?.token);

  return (
    <div>
      <div className="rounded-xl mb-5">
        <img src={checkedIcon} width="100%" className="rounded-xl" alt="" />
      </div>
      <div>
        <span className="text-2xl font-bold">Thank you for registering.</span>
        <br />
        <span className="text-2xl font-bold">
          {userData.CharityName}, {userData.FirstName}!
        </span>
      </div>
      <div className="my-10">
        <span className="text-xl">
          We have sent it to your email address for your future reference.
        </span>
      </div>
      <div className="mb-2">
        <button
          className="bg-thin-blue w-48 h-12 rounded-xl uppercase text-md font-bold text-white mb-3"
          onClick={() => history.push(register_routes.detail)}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default VerifiedEmail;
