import { appRoutes } from "constant/routes";
import { Link } from "react-router-dom";
import { WalletProfileVersion } from "services/types";
import { EndowmentBookmark } from "types/aws";
import Image from "components/Image";

export default function Favourite({
  name,
  endowId,
  logo,
  version,
}: EndowmentBookmark & { version: WalletProfileVersion }) {
  return (
    <li>
      <Link
        to={
          appRoutes[version === "latest" ? "marketplace" : "profile"] +
          "/" +
          endowId
        }
        className="flex items-center gap-2 py-1 font-heading font-semibold text-sm hover:bg-orange-l5 dark:hover:bg-blue-d3 rounded"
      >
        <Image src={logo} className="w-4 h-4 rounded-full" />
        <span className="truncate max-w-[200px]">{name}</span>
      </Link>
    </li>
  );
}
