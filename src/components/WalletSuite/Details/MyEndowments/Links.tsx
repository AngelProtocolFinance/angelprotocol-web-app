import { Link } from "react-router-dom";
import { appRoutes } from "constants/routes";

export default function Links({ endowmentId }: { endowmentId: number }) {
  return (
    <div className="flex items-center uppercase font-heading font-semibold text-xs underline underline-offset-2">
      <Link
        to={`${appRoutes.profile}/${endowmentId}`}
        className="pr-2 text-orange hover:text-orange-l2 decoration-1 hover:decoration-2"
      >
        profile
      </Link>
      <Link
        to={`${appRoutes.admin}/${endowmentId}`}
        className="px-2 border-l border-prim text-orange hover:text-orange-l2 decoration-1 hover:decoration-2"
      >
        admin
      </Link>
    </div>
  );
}
