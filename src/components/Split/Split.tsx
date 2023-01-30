import { TokenWithAmount } from "types/slices";
import Portion from "./Portion";
import Slider from "./Slider";

type Props = {
  liquidPercentage: number;
  token?: TokenWithAmount;
  onChange(value: number): void;
};

export default function Split(props: Props) {
  return (
    <div className="flex gap-2">
      <Portion
        percentage={100 - props.liquidPercentage}
        title="Endowment"
        action="Compounded forever"
      />
      <Portion
        percentage={props.liquidPercentage}
        title="Current"
        action="Instantly available"
        token={props.token}
      >
        <Slider
          className="my-2.5"
          value={props.liquidPercentage}
          onChange={props.onChange}
        />
      </Portion>
    </div>
  );
}
