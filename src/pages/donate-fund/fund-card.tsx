import { Link } from "@remix-run/react";
import Image from "components/Image";
import { toText } from "components/RichText";
import { Target } from "components/target";
import { appRoutes } from "constants/routes";

type Props = {
  id: string;
  progress: number;
  name: string;
  logo: string;
  tagline?: string;
  classes?: string;
};
export function FundCard({ classes = "", ...props }: Props) {
  return (
    <div
      className={`grid @xl/fund-card:grid-cols-[3fr_2fr] gap-x-4 gap-y-6 p-4 md:bg-white rounded-lg md:border border-gray-l4 ${classes}`}
    >
      <div className="grid grid-cols-[auto-1fr] gap-x-4 justify-start order-2 @xl/fund-card:order-1">
        <Image
          src={props.logo}
          className="size-14 border border-gray-l4 rounded-lg object-cover bg-white row-span-2"
        />
        <Link
          to={`${appRoutes.marketplace}/${props.id}`}
          className="hover:text-blue-d1 text-ellipsis overflow-hidden text-nowrap @xl/fund-card:text-balance col-start-2 w-full"
        >
          {props.name}
        </Link>
        {props.tagline && (
          <p className="text-navy-l1 text-sm w-full line-clamp-2">
            {toText(props.tagline)}
          </p>
        )}
      </div>
      <Target
        text={<Target.Text classes="mb-2" />}
        progress={props.progress}
        target="smart"
        classes="order-1 @xl/fund-card:order-2"
      />
    </div>
  );
}
