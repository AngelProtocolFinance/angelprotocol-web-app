import type { IPaginator } from "types/components";
import type { EndowCardsPage } from "types/npo";
import { Card } from "./card";

interface Props extends IPaginator<EndowCardsPage["items"][number]> {}

export function Cards({ classes = "", items, load_next, loading }: Props) {
  return (
    <div
      className={`${classes} w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start`}
    >
      {items.map((endow) => (
        <Card {...endow} key={endow.id} />
      ))}

      {load_next && (
        <button
          type="button"
          disabled={loading}
          className="col-span-full btn btn-blue rounded-md p-2 text-sm w-full mt-6"
          onClick={load_next}
        >
          Load more organizations
        </button>
      )}
    </div>
  );
}
