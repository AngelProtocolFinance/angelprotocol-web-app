import { FieldValues, Path, useFormContext } from "react-hook-form";
import Portion from "./Portion";
import Slider from "./Slider";
import { Token } from "./types";

type Props<FV extends FieldValues, P extends Path<FV>> = {
  className?: string;
  liqPctField: FV[P] extends number ? P : never;
  fixLiquidSplitPct?: number;
  token?: Token;
};

export default function Split<FV extends FieldValues, P extends Path<FV>>(
  props: Props<FV, P>
) {
  const { watch } = useFormContext<FV>();
  const liquidPercentage = watch(props.liqPctField);

  return (
    <div className={`grid grid-cols-2 gap-2 ${props.className || ""}`}>
      <Portion
        percentage={100 - liquidPercentage}
        title="Sustainability Fund"
        action="Compounded forever"
        token={props.token}
      />
      <Portion
        token={props.token}
        percentage={liquidPercentage}
        title="Donation"
        action="Instantly available"
      >
        <Slider
          className="my-2.5"
          liqPctField={props.liqPctField}
          disabled={props.fixLiquidSplitPct !== undefined}
        />
      </Portion>
    </div>
  );
}
