import { app_routes } from "constants/routes";
import { Link } from "react-router";

interface Props {
  classes?: string;
  to: string;
}
export function AuthBtns({ classes = "", to }: Props) {
  return (
    <div className={`${classes} flex items-center gap-x-4`}>
      <Link
        to={`${app_routes.signin}?redirect=${to}`}
        className="btn text-base normal-case hover:underline"
      >
        Log in
      </Link>
      <Link
        to={`${app_routes.signup}?redirect=${to}`}
        className="btn-blue font-semibold text-nowrap px-6 py-2 rounded-full"
      >
        Join us today!
      </Link>
    </div>
  );
}
