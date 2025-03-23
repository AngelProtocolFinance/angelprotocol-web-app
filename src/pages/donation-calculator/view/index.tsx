import type { State } from "../types";
import { bgView } from "./bg-view";
import { Chart } from "./chart";
import { Summary } from "./summary";
import { Tables } from "./table";

interface Props extends State {
  classes?: string;
}
export function View({ classes = "", ...state }: Props) {
  const v = bgView(state);
  return (
    <div>
      <Summary {...v} />
      <Chart {...v} />
      <Tables {...v} />
    </div>
  );
}
