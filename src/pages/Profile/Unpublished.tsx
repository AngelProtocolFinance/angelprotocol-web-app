import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { IS_AST } from "constants/env";
import { appRoutes } from "constants/routes";

export default function Unpublished() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen gap-2 bg-blue dark:bg-blue-d5 text-red-l4 dark:text-red-l2">
      <Icon type="ExclamationCircleFill" size={30} />
      <p className="text-lg text-center">
        This {IS_AST ? "AST" : "Endowment"} has no public profile
      </p>
      <Link
        to={`${appRoutes.index}`}
        className="text-blue-l5 hover:text-blue text-sm"
      >
        Go Back
      </Link>
    </section>
  );
}
