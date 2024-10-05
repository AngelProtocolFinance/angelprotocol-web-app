import type { FundItem } from "@better-giving/fundraiser";
import { humanize } from "helpers";

export function Progress(
  props: Pick<FundItem, "target" | "donation_total_usd">
) {
  if (props.target === "0") {
    if (!props.donation_total_usd) return;
    return (
      <p className="text-sm text-navy-l1">
        <span className="font-medium">
          ${humanize(props.donation_total_usd, 0, true)}
        </span>{" "}
        Raised
      </p>
    );
  }

  const progress = props.donation_total_usd;
  const milestone =
    props.target === "smart" ? nextMilestone(progress) : +props.target;

  return (
    <div className="grid grid-cols-2 @container">
      <div className="col-span-full h-3 bg-blue-l4 rounded-full mb-1 shadow-inner">
        <div
          style={{ width: `${(progress / milestone) * 100}%` }}
          className="h-full bg-blue-d1 rounded-full"
        />
      </div>
      <p className="flex gap-x-1 flex-col @xs:flex-row text-sm text-navy-l1 text-left">
        <span className="font-medium">
          ${humanize(props.donation_total_usd, 0)}
        </span>{" "}
        Raised
      </p>
      <p className="flex gap-x-1 flex-col @xs:flex-row text-sm text-navy-l1 justify-self-end text-right">
        <span className="font-medium">${humanize(milestone, 0)}</span>{" "}
        Goal&nbsp;amount
      </p>
    </div>
  );
}

function nextMilestone(progress: number): number {
  const base = 100;
  const multiplier = 2;
  let next = base;

  while (next <= progress) {
    next *= multiplier;
  }

  return next;
}
