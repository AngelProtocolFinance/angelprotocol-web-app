import { useFormContext } from "react-hook-form";
import { FormValues } from "../schema";
import Portion from "./Portion";
import Slider from "./Slider";

export default function Split() {
  const { watch } = useFormContext<FormValues>();

  const liquidPercentage = watch("liquidPercentage");

  return (
    <div className="flex gap-2">
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
        <Slider className="my-2.5" />
      </Portion>
    </div>
  );
}
