import diversity from "assets/icons/diversity.svg";
import { prettyUsd } from "helpers";
import type { ReactNode } from "react";

export interface ITarget {
  text?: ReactNode;
  progress: number;
  target: "smart" | number | null;
  classes?: string;
}

export type TTarget = "smart" | "0" | (string & {});

export const toTarget = (target: TTarget): "smart" | number | null => {
  return target === "smart" ? "smart" : target === "0" ? null : +target;
};

export function Target({ text, target, classes = "", progress }: ITarget) {
  if (target === null) return null;
  const to = target === "smart" ? nextMilestone(progress) : target;
  const pct = Math.min(progress, to) / to;

  return (
    <div className={classes}>
      {text}
      <div className="h-1.5 w-full rounded-full bg-green-l4 shadow-inner">
        <div
          style={{ width: `${pct * 100}%` }}
          className="h-full rounded-full bg-green shadow-xs"
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="flex items-center gap-x-1 text-sm text-gray">
          <span className="font-medium">${prettyUsd(progress)}</span>
          <span className="text-xs">Raised</span>
        </p>
        <p className="flex items-center gap-x-1 text-sm text-gray">
          <span className="font-medium">${prettyUsd(to)}</span>
          <span className="text-xs">Goal</span>
        </p>
      </div>
    </div>
  );
}

Target.Text = ({ classes = "" }) => {
  return (
    <p className={classes}>
      <img
        src={diversity}
        width={20}
        height={20}
        className="inline-block relative mr-2 bottom-1"
      />
      <span className="text-sm font-heading font-medium text-gray">
        Help them reach their goal!
      </span>
    </p>
  );
};

function nextMilestone(progress: number): number {
  const base = 100;
  const multiplier = 2;
  let next = base;

  while (next <= progress) {
    next *= multiplier;
  }

  return next;
}
