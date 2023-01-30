import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  className?: string;
  liqPctField: Path<T>;
};

export default function Slider<T extends FieldValues>(props: Props<T>) {
  const {
    register,
    formState: { isValid },
  } = useFormContext<T>();

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
