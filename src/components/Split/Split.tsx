import { FieldValues, Path, useFormContext } from "react-hook-form";
import { TokenWithAmount } from "types/slices";
import Portion from "./Portion";
import Slider from "./Slider";

type Props<FV extends FieldValues, P extends Path<FV>, T extends Path<FV>> = {
  className?: string;
  liqPctField: FV[P] extends number ? P : never;
  tokenField?: FV[T] extends TokenWithAmount ? T : never;
};

export default function Split<
  FV extends FieldValues,
  P extends Path<FV>,
  T extends Path<FV>
>(props: Props<FV, P, T>) {
  const { watch } = useFormContext<FV>();

  const liquidPercentage = watch(props.liqPctField);

  return (
    <div className={`flex gap-2 ${props.className || ""}`}>
      <Portion
        percentage={100 - liquidPercentage}
        title="Endowment"
        action="Compounded forever"
        tokenField={props.tokenField}
      />
      <Portion
        percentage={liquidPercentage}
        title="Current"
        action="Instantly available"
        tokenField={props.tokenField}
      >
        <Slider className="my-2.5" liqPctField={props.liqPctField} />
      </Portion>
    </div>
  );
}
