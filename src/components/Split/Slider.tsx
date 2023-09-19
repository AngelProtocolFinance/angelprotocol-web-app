import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";

type Props<FV extends FieldValues, P extends Path<FV>> = {
  className?: string;
  liqPctField: PathValue<FV, P> extends number ? P : never;
  disabled?: boolean;
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
        className="range"
        disabled={!isValid || props.disabled}
        {...register(props.liqPctField)}
        type="range"
      />
    </div>
  );
}
