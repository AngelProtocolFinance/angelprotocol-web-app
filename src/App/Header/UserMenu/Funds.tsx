import { useUserFundsQuery } from "services/aws/users";
import { FundLink, Skeleton } from "./EndowmentLink";

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
        funds.map((fund) => <FundLink key={fund.id} {...fund} />)
      )}
    </div>
  );
}
