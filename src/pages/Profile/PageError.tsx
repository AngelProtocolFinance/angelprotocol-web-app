import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";

export default function PageError() {
  return (
    <section className="padded-container flex flex-col items-center justify-center w-full h-screen gap-2 text-red-l1 dark:text-red-l2">
      <Icon type="Warning" size={30} />
      <p className="text-lg">Failed to load endowment profile</p>
      <Link
        to={`${appRoutes.index}`}
        className="text-blue-l5 hover:text-blue text-sm"
      >
        back to Marketplace
      </Link>
    </section>
  );
}
