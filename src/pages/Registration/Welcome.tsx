import { Link, Navigate, useLocation } from "react-router-dom";
import { InitReg } from "./types";
import Icon from "components/Icon";
import { APP_NAME } from "constant/env";
import { appRoutes } from "constant/routes";
import routes, { steps } from "./routes";

export default function Welcome({ classes = "" }: { classes?: string }) {
  const { state } = useLocation();
  const initReg = state as InitReg | undefined; //from non "/steps" navigations

  if (!initReg) {
    return <Navigate to={".."} />;
  }

  return (
    <div className={`${classes} grid justify-items-center`}>
      <Icon type="CheckCircle" className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center">
        Thank you for joining {APP_NAME}!
      </h1>
      <p className="text-center text-gray-d1 dark:text-white/75 w-full text-lg max-w-lg mt-4 mb-8">
        Your fundraising profile & endowment are just few steps away 😇
      </p>
      <Link
        className="w-full max-w-[26.25rem] btn-orange btn-reg"
        to={`${appRoutes.register}/${routes.steps}/${steps.contact}`}
        state={state}
      >
        Continue Registration
      </Link>
      <p className="text-sm italic text-gray-d1 dark:text-gray mt-8 text-center">
        Note: Registration is quick, but we've sent an email link if you need to
        pause and resume at any point.
      </p>
    </div>
  );
}
