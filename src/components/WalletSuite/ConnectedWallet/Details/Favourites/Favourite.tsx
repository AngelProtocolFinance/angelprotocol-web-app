import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";
import Image from "components/Image";
import { appRoutes } from "constants/routes";

export default function Favourite({ name, endowId, logo }: EndowmentBookmark) {
  return (
    <li>
      <Link
        to={appRoutes.profile + "/" + endowId}
        className="flex items-center gap-2 py-1 font-heading font-semibold text-sm hover:bg-orange-l5 dark:hover:bg-blue-d3 rounded"
      >
        <Image
          img={{ src: logo }}
          className="w-4 h-4 border border-prim rounded-full"
        />
        <span className="truncate max-w-[200px]">{name}</span>
      </Link>
    </li>
  );
}
