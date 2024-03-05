import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { UserType } from "./types";

type Props = { classes?: string; userType: UserType };

export default function Success({ classes = "", userType }: Props) {
  return (
    <div className={`grid place-items-center ${classes}`}>
      <h4 className="text-blue-d2">Your account was successfully created!</h4>
      {userType === "donor" ? (
        <Link
          to={appRoutes.signin}
          className="text-blue hover:text-blue-l1 underline mt-1"
        >
          Signin
        </Link>
      ) : (
        <Link
          to={appRoutes.register}
          className="text-blue hover:text-blue-l1 underline mt-1"
        >
          Register NPO
        </Link>
      )}
    </div>
  );
}
