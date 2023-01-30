import { FieldValues, Path, useFormContext } from "react-hook-form";
import Portion from "./Portion";
import Slider from "./Slider";

type Props<T extends FieldValues, K extends Path<T>> = {
  liqPctField: T[K] extends number ? K : never;
};

export default function Split<T extends FieldValues, K extends Path<T>>(
  props: Props<T, K>
) {
  const { watch } = useFormContext<T>();

  const liquidPercentage = watch(props.liqPctField);

  return (
    <div className="flex gap-2">
      <Portion
        percentage={100 - Number(liquidPercentage)}
        title="Endowment"
        action="Compounded forever"
      />
      <Portion
        percentage={Number(liquidPercentage)}
        title="Current"
        action="Instantly available"
      >
        <Slider<T> className="my-2.5" name={props.liqPctField} />
      </Portion>
    </div>
  );
}
