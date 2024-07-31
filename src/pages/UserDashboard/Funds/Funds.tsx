import ContentLoader from "components/ContentLoader";
import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useUserFundsQuery } from "services/aws/users";
import { routes } from "../routes";

interface Props {
  userId: string;
  classes?: string;
}
export function Funds({ userId, classes = "" }: Props) {
  const { data: funds = [], isLoading } = useUserFundsQuery(userId);
  return (
    <div className={`${classes} hidden [&:has(a)]:grid gap-2`}>
      <h5 className="uppercase text-xs text-navy-l1">My Fundraisers</h5>

      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        funds.map((fund) => <Fund key={fund.id} {...fund} />)
      )}
    </div>
  );
}

interface IFundLink {
  id: string;
  name: string;
  logo: string;
}
const Fund = (props: IFundLink) => (
  <div className="hover:text-blue-d1 text-sm flex items-center gap-2">
    <Image src={props.logo} className="object-cover h-[20px] w-[20px]" />
    <span>{props.name}</span>
    <Link className="text-sm" to={`${routes.funds}/${props.id}`}>
      edit
    </Link>
    <Link className="text-sm" to={`${appRoutes.funds}/${props.id}`}>
      view
    </Link>
  </div>
);

export function Skeleton() {
  return (
    <a
      href={"/"}
      className="flex items-center gap-1 pointer-events-none"
      aria-disabled={true}
    >
      <ContentLoader className="w-[20px] h-[20px] rounded-full" />
      <ContentLoader className="h-[20px] w-40 rounded" />
    </a>
  );
}
