import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";

export default function Unpublished() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen gap-2 bg-blue dark:bg-blue-d5 text-red-l4 dark:text-red-l2">
      <Icon type="Exclamation" size={30} />
      <p className="text-lg text-center">
        This nonprofit has no public profile
      </p>
      <Link
        to={appRoutes.marketplace}
        className="text-blue-l5 hover:text-blue text-sm"
      >
        Go Back
      </Link>
    </section>
  );
}
