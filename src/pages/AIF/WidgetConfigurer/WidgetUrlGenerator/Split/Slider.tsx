import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
};

export default function Slider<T extends FieldValues>({
  className = "",
  name,
}: Props<T>) {
  const { register } = useFormContext<T>();
  return (
    <div className={`${className} select-none`}>
      <input
        className="range"
        {...register(name)}
        min={0}
        max={100}
        type="range"
      />
    </div>
  );
}
