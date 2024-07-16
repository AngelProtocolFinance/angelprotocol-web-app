import ContentLoader from "components/ContentLoader";
import { useUserEndowsQuery } from "services/aws/users";
import EndowmentLink from "./EndowmentLink";

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
        endows.map((endow) => (
          <EndowmentLink key={endow.endowID} {...endow} route="admin" />
        ))
      )}
    </div>
  );
}

function Skeleton() {
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
