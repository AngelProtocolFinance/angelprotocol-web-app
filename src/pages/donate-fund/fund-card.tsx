import { Image } from "components/image";
import { toText } from "components/rich-text";
import { type TTarget, Target, to_target } from "components/target";
import { app_routes } from "constants/routes";
import { Link } from "react-router";

type Props = {
  id: string;
  progress: number;
  target: TTarget;
  name: string;
  logo: string;
  tagline?: string;
  classes?: string;
};
export function FundCard({ classes = "", ...props }: Props) {
  return (
    <div
      className={`grid @-xl/fund-card:grid-cols-[3fr_2fr] gap-x-4 gap-y-6 p-4 md:bg-white rounded-lg md:border border-gray-l3 ${classes}`}
    >
      <div className="grid grid-cols-[auto-1fr] gap-x-4 justify-start order-2 @xl/fund-card:order-1">
        <Image
          src={props.logo}
          className="size-14 border border-gray-l3 rounded-lg object-cover bg-white row-span-2"
        />
        <Link
          to={`${app_routes.funds}/${props.id}`}
          className="hover:text-blue-d1 text-ellipsis overflow-hidden text-nowrap @xl/fund-card:text-balance col-start-2 w-full"
        >
          {props.name}
        </Link>
        {props.tagline && (
          <p className="text-gray text-sm w-full line-clamp-2">
            {toText(props.tagline)}
          </p>
        )}
      </div>
      <Target
        text={<Target.Text classes="mb-2" />}
        progress={props.progress}
        target={to_target(props.target)}
        classes="order-1 @xl/fund-card:order-2"
      />
    </div>
  );
}
