import { humanize } from "helpers/decimal";
import { SparklesIcon } from "lucide-react";
import type { IFees } from "./helpers";

interface Props extends IFees {
  classes?: string;
}

export function Fees({ classes = "", ...f }: Props) {
  const covered_by_donor = f.processing_allowance > 0;
  return (
    <div className={`${classes} grid gap-y-2 text-xs`}>
      {f.base > 0 && (
        <div>
          <p className="text-2xs uppercase text-gray">base</p> $
          {humanize(f.base, 3)}
        </div>
      )}
      {f.fsa > 0 && (
        <div>
          <p className="text-2xs uppercase text-gray">fiscal sponsorship</p> $
          {humanize(f.fsa, 3)}
        </div>
      )}
      {f.processing > 0 && (
        <div className="">
          <p className="text-2xs uppercase text-gray">processing</p>{" "}
          <p className="flex items-center">
            <span
              className={`${covered_by_donor ? "line-through text-gray" : ""}`}
            >
              ${humanize(f.processing, 3)}
            </span>
            {covered_by_donor && (
              <SparklesIcon
                className="fill-green stroke-green ml-1"
                size={13}
              />
            )}
          </p>
        </div>
      )}
    </div>
  );
}
