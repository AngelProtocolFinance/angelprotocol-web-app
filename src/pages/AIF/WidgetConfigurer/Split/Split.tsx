import Portion from "./Portion";
import Slider from "./Slider";

type Props = { liquidPercentage: number; onChange(newValue: number): void };

export default function Split({ liquidPercentage, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Portion
        percentage={100 - liquidPercentage}
        title="Endowment"
        action="Compounded forever"
      />
      <Portion
        percentage={liquidPercentage}
        title="Current"
        action="Instantly available"
      >
        <Slider className="my-2.5" onChange={onChange} />
      </Portion>
    </div>
  );
}
