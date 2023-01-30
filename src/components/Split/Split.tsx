import { FieldValues, Path, useFormContext } from "react-hook-form";
import Portion from "./Portion";
import Slider from "./Slider";

type Props<T extends FieldValues> = {
  className?: string;
  liqPctField: Path<T>;
  tokenField?: Path<T>;
};

export default function Split<T extends FieldValues>(props: Props<T>) {
  const { watch } = useFormContext<T>();

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
