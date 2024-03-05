import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  logo: string;
  banner: string;
  tagline: string;
  classes?: string;
};
export default function OrgCard({
  id,
  classes = "",
  name,
  logo,
  tagline,
  banner,
}: Props) {
  return (
    <div
      className={`p-4 max-md:bg-blue-l4 md:p-0 md:rounded md:overflow-clip md:border border-gray-l4 ${classes}`}
    >
      <Image
        src={banner}
        className="h-24 object-cover object-center w-full hidden md:block"
      />
      <div className="hidden md:flex items-center w-full overflow-visible h-0">
        <Image
          src={logo}
          className="size-14 border border-gray-l4 rounded-full object-cover bg-white ml-6"
        />
      </div>
      <div className="md:p-4 md:pt-11">
        <div className="text-lg md:mb-2 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Image
            src={logo}
            className="size-10 object-cover rounded-full md:hidden"
          />
          <h4 className="text-ellipsis overflow-hidden text-nowrap md:text-balance">
            {name}
          </h4>
          <Link
            to={`${appRoutes.marketplace}/${id}`}
            className="md:hidden text-sm font-semibold text-blue hover:text-blue-l1 active:text-blue-d1"
          >
            Cancel
          </Link>
        </div>
        <p className="text-gray-d1 text-sm max-md:hidden">{tagline}</p>
      </div>
    </div>
  );
}
