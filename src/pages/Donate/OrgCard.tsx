import { Await, Link, useLoaderData } from "@remix-run/react";
import type { DonateData } from "api/donate-loader";
import Image from "components/Image";
import { type TTarget, Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";

type Props = {
  id: number;
  name: string;
  logo: string;
  tagline?: string;
  target?: TTarget;
  classes?: string;
};
export default function OrgCard({ classes = "", ...props }: Props) {
  const { balance } = useLoaderData() as DonateData;
  return (
    <div
      className={`grid @xl/org-card:grid-cols-[3fr_2fr] gap-x-4 gap-y-6 p-4 md:bg-white rounded-lg md:border border-gray-l4 ${classes}`}
    >
      <div className="grid grid-cols-[auto-1fr] gap-x-4 justify-start order-2 @xl/org-card:order-1">
        <Image
          src={props.logo}
          className="size-14 border border-gray-l4 rounded-lg object-cover bg-white row-span-2"
        />
        <Link
          to={`${appRoutes.marketplace}/${props.id}`}
          className="hover:text-blue-d1 text-ellipsis overflow-hidden text-nowrap @xl/org-card:text-balance col-start-2 w-full"
        >
          {props.name}
        </Link>
        {props.tagline && (
          <p className="text-navy-l1 text-sm w-full line-clamp-2">
            {props.tagline}
          </p>
        )}
      </div>

      <Await resolve={balance}>
        {(b) =>
          props.target && (
            <Target
              text={<Target.Text classes="mb-2" />}
              progress={b.totalContributions}
              target={toTarget(props.target)}
              classes="order-1 @xl/org-card:order-2"
            />
          )
        }
      </Await>
    </div>
  );
}
