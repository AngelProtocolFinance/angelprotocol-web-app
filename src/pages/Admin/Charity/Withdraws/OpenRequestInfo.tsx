import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { adminRoutes } from "constants/routes";

export default function OpenRequestInfo() {
  return (
    <div className="flex place-content-center py-2 gap-3 w-full dark:bg-blue-d6 border border-prim rounded">
      <Icon type="Info" className="w-6 h-6" />
      <span className="text-sm">
        There are open requests that need your attention.{" "}
        <Link
          to={adminRoutes.proposals}
          className="text-orange hover:text-orange-l2 active:text-orange-d1 underline"
        >
          Check them out now
        </Link>
      </span>
    </div>
  );
}
