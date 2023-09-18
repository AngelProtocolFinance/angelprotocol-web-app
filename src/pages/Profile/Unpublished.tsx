import { IS_AST } from "constant/env";
import { appRoutes } from "constant/routes";
import { Link } from "react-router-dom";
import Icon from "components/Icon";

export default function Unpublished() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen gap-2 bg-blue dark:bg-blue-d5 text-red-l4 dark:text-red-l2">
      <Icon type="ExclamationCircleFill" size={30} />
      <p className="text-lg text-center">
        This {IS_AST ? "AST" : "Endowment"} has no public profile
      </p>
      <Link
        to={IS_AST ? appRoutes.register : appRoutes.marketplace}
        className="text-blue-l5 hover:text-blue text-sm"
      >
        Go Back
      </Link>
    </section>
  );
}
