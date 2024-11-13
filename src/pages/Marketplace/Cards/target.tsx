import { prettyUsd } from "helpers";

interface Props {
  progress: number;
  target?: "smart" | (string & {});
  classes?: string;
}
export function Target({ target = "", progress, classes = "" }: Props) {
  if (!target) return null;

  const to = target === "smart" ? nextMilestone(progress) : +target;

  const pct = Math.min(progress, to) / to;

  return (
    <div className={classes}>
      <div className="h-1.5 w-full rounded-full bg-green-l4 shadow-inner">
        <div
          style={{ width: `${pct * 100}%` }}
          className="h-full rounded-full bg-green shadow-sm"
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="flex items-center gap-x-1 text-sm text-navy-l1">
          <span className="font-medium">${prettyUsd(progress)}</span>
          <span className="text-xs">Raised</span>
        </p>
        <p className="flex items-center gap-x-1 text-sm text-navy-l1">
          <span className="font-medium">${prettyUsd(to)}</span>
          <span className="text-xs">Goal</span>
        </p>
      </div>
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
