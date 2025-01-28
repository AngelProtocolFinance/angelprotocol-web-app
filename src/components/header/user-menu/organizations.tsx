import { Await } from "@remix-run/react";
import { Suspense } from "react";
import type { DetailedUser } from "types/auth";
import { EndowmentLink, Skeleton } from "./endowment-link";

interface Props {
  user: DetailedUser;
  classes?: string;
}
export function Organizations({ user, classes = "" }: Props) {
  return (
    <div className={`${classes} hidden [&:has(a)]:grid gap-2`}>
      <h5 className="uppercase text-xs text-gray">My Organizations</h5>

      <Suspense
        fallback={
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        }
      >
        <Await resolve={user.orgs}>
          {(loaded) => (
            <>
              {loaded.map((org) => (
                <EndowmentLink key={org.endowID} {...org} />
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
