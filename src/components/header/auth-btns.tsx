import { Link, href } from "react-router";

interface Props {
  classes?: string;
  to: string;
}
export function AuthBtns({ classes = "", to }: Props) {
  return (
    <div className={`${classes} flex items-center gap-x-4`}>
      <Link
        to={`${href("/login")}?redirect=${to}`}
        className="btn text-base normal-case hover:underline"
      >
        Log in
      </Link>
      <Link
        to={`${href("/signup")}?redirect=${to}`}
        className="btn-blue font-semibold text-nowrap px-6 py-2 rounded"
      >
        Sign Up Free
      </Link>
    </div>
  );
}
