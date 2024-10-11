import { useUserEndowsQuery } from "services/aws/users";
import { EndowmentLink, Skeleton } from "./EndowmentLink";

interface Props {
  userId: string;
  classes?: string;
}
export function Organizations({ userId, classes = "" }: Props) {
  const { data: endows = [], isLoading } = useUserEndowsQuery(userId);
  return (
    <div className={`${classes} hidden [&:has(a)]:grid gap-2`}>
      <h5 className="uppercase text-xs text-navy-l1">My Organizations</h5>

      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        endows.map((endow) => <EndowmentLink key={endow.endowID} {...endow} />)
      )}
    </div>
  );
}
