import { PropsWithChildren, useEffect } from "react";
import { TokenWithAmount } from "types/slices";
import { humanize, logger } from "helpers";

type Props = PropsWithChildren<{
  action: string;
  title: string;
  percentage: number;
  token?: TokenWithAmount;
}>;

export default function Portion(props: Props) {
  useEffect(() => {
    if (!props.token) {
      return;
    }

    if (isNaN(Number(props.token.amount))) {
      logger.error(`${props.token.amount} is NaN`);
    }
  }, [props.token, props.token?.amount]);

  const disp_amount = props.token
    ? `${props.token.symbol} ${humanize(
        (props.percentage / 100) *
          (isNaN(Number(props.token.amount)) ? 0 : Number(props.token.amount)),
        5
      )}`
    : null;

  return (
    <div className="flex flex-col items-center w-40 xl:w-48 aspect-square p-6 bg-orange-l6 dark:bg-blue-d6 border border-prim rounded">
      <p className="uppercase font-bold text-sm sm:text-base">{props.title}</p>
      <p className="text-xs sm:text-sm mb-2 font-bold">{props.percentage}%</p>
      <p className="uppercase text-xs sm:text-sm text-center font-body">
        {props.action}
      </p>
      {props.children}
      {disp_amount != null && (
        <p className="mt-auto font-bold md:text-lg text-center">
          {disp_amount}
        </p>
      )}
    </div>
  );
}
