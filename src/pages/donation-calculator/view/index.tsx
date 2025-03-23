import type { State } from "../types";
import { Chart } from "./chart";
import { Summary } from "./summary";

interface Props extends State {
  classes?: string;
}
export function View({ classes = "", ...state }: Props) {
  return (
    <div>
      <Summary state={state} />
      <Chart {...state} />
    </div>
  );
}
