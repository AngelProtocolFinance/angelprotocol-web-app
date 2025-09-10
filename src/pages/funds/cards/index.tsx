import type { FundItem } from "@better-giving/fundraiser";
import type { IPaginator } from "types/components";
import Card from "./card";

interface Props extends IPaginator<FundItem> {
  classes?: string;
}

export function Cards({ classes = "", ...props }: Props) {
  return (
    <div
      className={`${classes} w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start`}
    >
      {props.items.map((fund) => (
        <Card {...fund} key={fund.id} />
      ))}

      {props.load_next && (
        <button
          className="col-span-full btn btn-blue rounded-md p-2 text-sm w-full mt-6"
          onClick={props.load_next}
          disabled={props.loading}
        >
          Load more funds
        </button>
      )}
    </div>
  );
}
