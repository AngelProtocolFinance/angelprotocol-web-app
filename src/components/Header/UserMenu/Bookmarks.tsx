import { Await } from "@remix-run/react";
import { Suspense } from "react";
import type { DetailedUser } from "types/auth";
import { BookmarkLink } from "./EndowmentLink";

interface Props {
  classes?: string;
  user: DetailedUser;
}

export function Bookmarks({ classes = "", user }: Props) {
  return (
    <div className={`${classes} hidden [&:has(a)]:grid mt-6 gap-2`}>
      <h5 className="uppercase text-xs text-navy-l1 -mb-1">My Favorites</h5>

      <Suspense>
        <Await resolve={user.bookmarks}>
          {(bms) => (
            <>
              {bms.map((b) => (
                <BookmarkLink key={b.endowId} {...b} />
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
