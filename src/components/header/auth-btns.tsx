import { appRoutes } from "constants/routes";
import { Link } from "react-router";

interface Props {
  classes?: string;
  to: string;
}
export function AuthBtns({ classes = "", to }: Props) {
  return (
    <div className={`${classes} flex items-center gap-x-4`}>
      <Link
        to={`${appRoutes.signin}?redirect=${to}`}
        className="btn text-base normal-case hover:underline"
      >
        Log in
      </Link>
      <Link
        to={`${appRoutes.signup}?redirect=${to}`}
        className="btn-blue text-nowrap px-6 py-2 rounded-full"
      >
        Sign up
      </Link>
    </div>
  );
}
