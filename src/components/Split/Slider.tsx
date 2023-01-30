import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<FV extends FieldValues, P extends Path<FV>> = {
  className?: string;
  liqPctField: FV[P] extends number ? P : never;
};

export default function Slider<FV extends FieldValues, P extends Path<FV>>(
  props: Props<FV, P>
) {
  const {
    register,
    formState: { isValid },
  } = useFormContext<FV>();

  return (
    <div className={`${props.className || ""} select-none`}>
      <input
        className="slider"
        disabled={!isValid}
        {...register(props.liqPctField)}
        type="range"
      />
    </div>
  );
}
