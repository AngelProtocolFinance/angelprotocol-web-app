import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { Target } from "./target";

type Props = {
  id: number;
  name: string;
  logo: string;
  tagline?: string;
  classes?: string;
};
export default function OrgCard({
  classes = "",
  name,
  logo,
  tagline,
  id,
}: Props) {
  return (
    <div
      className={`grid @xl/org-card:grid-cols-[3fr_2fr] gap-x-4 gap-y-6 p-4 md:bg-white rounded-lg md:border border-gray-l4 ${classes}`}
    >
      <div className="grid grid-cols-[auto-1fr] gap-x-4 justify-start order-2 @xl/org-card:order-1">
        <Image
          src={logo}
          className="size-14 border border-gray-l4 rounded-lg object-cover bg-white row-span-2"
        />
        <Link
          to={`${appRoutes.marketplace}/${id}`}
          className="hover:text-blue-d1 text-ellipsis overflow-hidden text-nowrap @xl/org-card:text-balance col-start-2 w-full"
        >
          {name}
        </Link>
        {tagline && (
          <p className="text-navy-l1 text-sm w-full line-clamp-2">{tagline}</p>
        )}
      </div>
      <Target
        endowId={id}
        target="smart"
        classes="order-1 @xl/org-card:order-2"
      />
    </div>
  );
}
