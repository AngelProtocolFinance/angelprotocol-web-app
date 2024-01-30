import { humanize } from "helpers";
import { PropsWithChildren } from "react";
import { Token } from "./types";

type Props = PropsWithChildren<{
  action: string;
  title: string;
  percentage: number;
  token?: Token;
}>;

export default function Portion({
  token,
  percentage,
  action,
  title,
  children,
}: Props) {
  return (
    <div className="flex flex-col items-center p-6 bg-orange-l6 dark:bg-blue-d6 border border-prim rounded">
      <p className="uppercase font-bold text-sm sm:text-base text-center">
        {title}
      </p>
      <p className="text-xs sm:text-sm mb-2 font-bold">{percentage}%</p>
      <p className="uppercase text-xs sm:text-sm text-center">{action}</p>
      {children}
      {token && (
        <p className="mt-auto font-bold md:text-lg text-center">
          {token.symbol} {humanize(token.amount * (percentage / 100), 5)}
        </p>
      )}
    </div>
  );
}
