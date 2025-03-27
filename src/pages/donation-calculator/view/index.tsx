import { bgView } from "../bg-view";
import type { State } from "../types";
import { Chart } from "./chart";
import { Tables } from "./table";

interface Props extends State {
  classes?: string;
}
export function View({ classes = "", ...state }: Props) {
  const v = bgView(state);
  return (
    <div className={`${classes} grid gap-y-4`}>
      <Chart {...v} />
      <Tables {...v} />
    </div>
  );
}
