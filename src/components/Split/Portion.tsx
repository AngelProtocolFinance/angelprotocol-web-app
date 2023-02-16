import { PropsWithChildren } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { TokenWithAmount } from "types/slices";
import { humanize } from "helpers";

type Props<FV extends FieldValues, T extends Path<FV>> = PropsWithChildren<{
  action: string;
  title: string;
  percentage: number;
  tokenField?: FV[T] extends TokenWithAmount ? T : never;
}>;

export default function Portion<FV extends FieldValues, T extends Path<FV>>(
  props: Props<FV, T>
) {
  const { watch } = useFormContext<FV>();

  let disp_amount: string | null = null;

  if (props.tokenField) {
    const token = watch(props.tokenField);
    if (token) {
      disp_amount = `${token.symbol} ${humanize(
        (props.percentage / 100) *
          (isNaN(Number(token.amount)) ? 0 : Number(token.amount)),
        5
      )}`;
    }
  }

  return (
    <div className="flex flex-col items-center p-6 bg-orange-l6 dark:bg-blue-d6 border border-prim rounded">
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
