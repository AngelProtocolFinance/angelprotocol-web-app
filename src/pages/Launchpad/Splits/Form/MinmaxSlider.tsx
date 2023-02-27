import { ChangeEvent, ReactNode } from "react";
import { FieldValues, Path, useController } from "react-hook-form";

const OVERLAP_WIDTH = 0.1;
export function MinmaxSlider<T extends FieldValues>(props: {
  names: { min: Path<T>; max: Path<T> };
  children(min: number, max: number): ReactNode;
}) {
  const {
    field: { value: min, onChange: onMinChange },
  } = useController({ name: props.names.min });
  const {
    field: { value: max, onChange: onMaxChange },
  } = useController({ name: props.names.max });

  function handleMaxChange(e: ChangeEvent<HTMLInputElement>) {
    const max = +e.target.value;
    if (max < min) {
      onMinChange(max);
    }
    onMaxChange(max);
  }

  function handleMinChange(e: ChangeEvent<HTMLInputElement>) {
    const min = +e.target.value;
    if (min > max) {
      onMaxChange(min);
    }
    onMinChange(min);
  }

  return (
    <div>
      {props.children(min, max)}
      <div
        className="relative my-6 h-10"
        style={{
          //prettier-ignore
          background: `linear-gradient(to right, #fafafa30 ${min-OVERLAP_WIDTH}%, 
            #7dd3fc ${min-OVERLAP_WIDTH}%, #0ea5e9 ${max+OVERLAP_WIDTH}%, 
            #fafafa30 ${max+OVERLAP_WIDTH}%)`,
        }}
      >
        <label
          className="absolute -bottom-7 text-sm"
          style={{ left: `${min}%` }}
        >
          {min}%
        </label>
        <input
          className={`absolute inset-x-0 top-0 h-0`}
          type="range"
          step={1}
          min={0}
          max={100}
          value={max}
          onChange={handleMaxChange}
        />
        <label className="absolute -top-6 text-sm" style={{ left: `${max}%` }}>
          {max}%
        </label>
        <input
          className="absolute inset-x-0 bottom-0 h-0"
          type="range"
          step={1}
          min={0}
          max={100}
          value={min}
          onChange={handleMinChange}
        />
      </div>
    </div>
  );
}
