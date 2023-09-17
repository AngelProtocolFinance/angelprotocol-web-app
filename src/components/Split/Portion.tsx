import { PropsWithChildren } from "react";
import { Token } from "./types";
import { humanize } from "helpers";

type Props = PropsWithChildren<{
  action: string;
  title: string;
  percentage: number;
  token: Token;
}>;

export default function Portion({
  token,
  percentage,
  action,
  title,
  children,
}: Props) {
  const portionAmount = token.amount * (percentage / 100);
  const prettyPortionAmount = `${token.symbol} ${humanize(portionAmount, 5)}`;

  return (
    <div className="flex flex-col items-center p-6 bg-orange-l6 dark:bg-blue-d6 border border-prim rounded">
      <p className="uppercase font-bold text-sm sm:text-base">{title}</p>
      <p className="text-xs sm:text-sm mb-2 font-bold">{percentage}%</p>
      <p className="uppercase text-xs sm:text-sm text-center font-body">
        {action}
      </p>
      {children}
      {portionAmount && (
        <p className="mt-auto font-bold md:text-lg text-center">
          {prettyPortionAmount}
        </p>
      )}
    </div>
  );
}
