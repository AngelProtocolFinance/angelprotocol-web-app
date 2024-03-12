import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";

type Props = { classes?: string };
export default function Success({ classes = "" }: Props) {
  return (
    <div className={`grid place-items-center ${classes}`}>
      <h4 className="text-blue-d2">Your account was successfully created!</h4>
      <Link
        to={appRoutes.signin}
        className="text-blue hover:text-blue-l1 underline mt-1"
      >
        Log in
      </Link>
    </div>
  );
}
