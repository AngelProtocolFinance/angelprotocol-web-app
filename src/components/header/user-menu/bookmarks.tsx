import { Suspense } from "react";
import { Await } from "react-router";
import type { DetailedUser } from "types/auth";
import { BookmarkLink } from "./endowment-link";

interface Props {
  classes?: string;
  user: DetailedUser;
}

export function Bookmarks({ classes = "", user }: Props) {
  return (
    <div
      className={`${classes} content-start grid-cols-subgrid col-span-2 gap-y-1`}
    >
      <h5 className="uppercase text-xs text-gray col-span-2 mb-1">
        My Favorites
      </h5>

      <Suspense>
        <Await resolve={user.bookmarks}>
          {(bms) => (
            <>
              {bms.map((b) => (
                <BookmarkLink key={b.id} {...b} />
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
