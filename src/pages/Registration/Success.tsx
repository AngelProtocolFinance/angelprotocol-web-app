import { Navigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CompleteRegistration } from "./types";
import Icon from "components/Icon";
import { adminRoutes, appRoutes } from "constants/routes";

export default function Success({ classes = "" }: { classes?: string }) {
  const { state } = useLocation();
  const reg = state as CompleteRegistration | undefined;

  if (!reg || !reg.endowId) {
    return <Navigate to={".."} />;
  }

  const { contact } = reg;

  return (
    <div
      className={`${classes} grid padded-container max-w-lg justify-items-center`}
    >
      <Icon type="CheckCircle" className="text-green" size={92} />
      <h1 className="text-[2rem] font-bold mt-10 text-center">
        {contact.orgName}’s endowment has been created!
      </h1>
      <p className="mt-6 text-center">
        Thank you for your interest in Angel Protocol!
      </p>
      <p className="mb-8 mt-4 text-gray-d1 dark:text-white/75 text-center">
        Use the button below to start filling out {contact.orgName}’s profile
        and attract donors!
      </p>
      <Link
        className="w-full max-w-[26.25rem] btn-orange btn-reg"
        to={`${appRoutes.admin}/${reg.endowId}/${adminRoutes.edit_profile}`}
      >
        edit profile
      </Link>
    </div>
  );
}
