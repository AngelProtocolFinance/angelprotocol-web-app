import { TokenWithAmount } from "types/slices";
import Portion from "./Portion";
import Slider from "./Slider";

type Props = {
  className?: string;
  disabled?: boolean;
  liquidPercentage: number;
  token?: TokenWithAmount;
  onChange(value: number): void;
};

export default function Split(props: Props) {
  return (
    <div className={`flex gap-2 ${props.className || ""}`}>
      <Portion
        percentage={100 - props.liquidPercentage}
        title="Endowment"
        action="Compounded forever"
        token={props.token}
      />
      <Portion
        percentage={props.liquidPercentage}
        title="Current"
        action="Instantly available"
        token={props.token}
      >
        <Slider
          className="my-2.5"
          disabled={props.disabled}
          value={props.liquidPercentage}
          onChange={props.onChange}
        />
      </Portion>
    </div>
  );
}
