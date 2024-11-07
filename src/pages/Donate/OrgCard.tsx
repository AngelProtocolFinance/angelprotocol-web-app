import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { Target } from "./Target";

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
      className={`grid grid-cols-[3fr_2fr] gap-x-4 p-4 md:bg-white rounded-lg md:overflow-clip md:border border-gray-l4 ${classes}`}
    >
      <div className="grid grid-cols-[auto-1fr] gap-x-4 justify-start">
        <Image
          src={logo}
          className="size-14 border border-gray-l4 rounded-lg object-cover bg-white row-span-2"
        />
        <Link
          to={`${appRoutes.marketplace}/${id}`}
          className="hover:text-blue-d1 text-ellipsis overflow-hidden text-nowrap md:text-balance col-start-2 w-full"
        >
          {name}
        </Link>
        {tagline && (
          <p className="text-navy-l1 text-sm w-full line-clamp-2">{tagline}</p>
        )}
      </div>
      <Target endowId={id} target={20_000} />
    </div>
  );
}
