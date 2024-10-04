import type { Submission } from "@better-giving/registration/models";
import type { CompleteReg } from "@better-giving/registration/step";
import Icon from "components/Icon";
import { adminRoutes, appRoutes } from "constants/routes";
import { Navigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export function Component({ classes = "" }: { classes?: string }) {
  const { state } = useLocation();
  const reg = state as CompleteReg | undefined;

  if (!reg || typeof reg.submission !== "object") {
    return <Navigate to={".."} />;
  }

  const { contact } = reg;

  return (
    <div
      className={`${classes} grid padded-container max-w-lg justify-items-center`}
    >
      <Icon type="CheckCircle" className="text-green" size={92} />
      <h1 className="text-[2rem] mt-10 text-center">
        {contact.org_name}’s account has been created!
      </h1>
      <Link
        className="mt-6 text-blue-d1 hover:text-blue underline decoration-1 hover:decoration-2 text-center text-lg transition ease-in-out duration-300"
        to={`${appRoutes.admin}/${
          (reg.submission as Extract<Submission, { endowment_id: any }>)
            .endowment_id
        }/${adminRoutes.edit_profile}`}
      >
        Start filling out {contact.org_name}’s profile and attract donors! Thank
        you!
      </Link>
    </div>
  );
}
