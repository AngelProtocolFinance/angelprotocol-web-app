import ContentLoader from "components/ContentLoader";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useUserFundsQuery } from "services/aws/users";
import { routes } from "../routes";

interface Props {
  userId: string;
  classes?: string;
}
export function Funds({ userId, classes = "" }: Props) {
  const query = useUserFundsQuery(userId);
  return (
    <div
      className={`${classes} grid gap-y-4 grid-cols-[auto_1fr_auto_auto] justify-items-start`}
    >
      <h3 className="text-3xl mb-2 col-span-full">My Fundraisers</h3>

      <QueryLoader
        messages={{
          loading: (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ),
          error: "Failed to get fundraisers",
          empty: "You currently don't have any fundraisers",
        }}
        queryState={query}
      >
        {(funds) => (
          <>
            {funds.map((fund) => (
              <Fund key={fund.id} {...fund} />
            ))}
          </>
        )}
      </QueryLoader>
    </div>
  );
}

interface IFundLink {
  id: string;
  name: string;
  logo: string;
}
const Fund = (props: IFundLink) => (
  <div className="grid grid-cols-subgrid col-span-4 items-center gap-3 rounded border border-gray-l4">
    <Image src={props.logo} className="object-cover h-full w-10" />
    <span className="mr-4 p-1.5 font-medium text-navy-l1">{props.name}</span>
    <Link
      className="text-sm hover:text-blue-d1 text-blue uppercase p-3"
      to={`${routes.funds}/${props.id}`}
    >
      edit
    </Link>
    <Link
      className="text-sm hover:text-blue-d1 text-blue uppercase p-3"
      to={`${appRoutes.funds}/${props.id}`}
    >
      view
    </Link>
  </div>
);

export function Skeleton() {
  return (
    <div
      className="flex items-center gap-x-2 w-full col-span-full"
      aria-disabled={true}
    >
      <ContentLoader className="size-10 rounded-full" />
      <ContentLoader className="w-full h-10 rounded" />
    </div>
  );
}
