import { ChangeEvent, ReactNode } from "react";
import { FieldValues, Path, useController } from "react-hook-form";

export function MinmaxSlider<T extends FieldValues>(props: {
  names: { min: Path<T>; max: Path<T> };
  children(min: number, max: number, disabled?: boolean): ReactNode;
  disabled?: boolean;
  hidden?: "min" | "max";
  hideLabels?: true;
}) {
  const {
    field: { value: min, onChange: onMinChange },
  } = useController<Record<string, number>>({ name: props.names.min });
  const {
    field: { value: max, onChange: onMaxChange },
  } = useController<Record<string, number>>({ name: props.names.max });

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

  const isClose = max - min < 8;

  return (
    <div>
      <div className="relative my-6 h-4 border border-prim rounded-full">
        {props.hidden !== "min" && (
          <>
            {!props.hideLabels && !isClose && (
              <label
                className="absolute -bottom-7 -ml-1 text-sm"
                style={{ left: `${min}%` }}
              >
                {min}%
              </label>
            )}
            <input
              id="min"
              className="peer range-min absolute inset-x-0 top-0 h-0 z-10"
              disabled={props.disabled}
              type="range"
              step={1}
              min={0}
              max={100}
              value={max}
              onChange={handleMaxChange}
            />
          </>
        )}
        {props.hidden !== "max" && (
          <>
            {!props.hideLabels && !isClose && (
              <label
                className="absolute -bottom-7 -ml-3 text-sm"
                style={{ left: `${max}%` }}
              >
                {max}%
              </label>
            )}
            <input
              id="max"
              className="peer range-max absolute inset-x-0 bottom-0 h-0 z-10"
              disabled={props.disabled}
              type="range"
              step={1}
              min={0}
              max={100}
              value={min}
              onChange={handleMinChange}
            />
          </>
        )}
        <div
          className={`absolute inset-y-0 bg-orange/25 peer-disabled:bg-[#F5F5F5] dark:peer-disabled:bg-bluegray-d1 ${
            props.hidden === "max"
              ? "rounded-l-full"
              : props.hidden === "min"
              ? "rounded-r-full"
              : "rounded-full"
          } z-0`}
          style={{
            left: `${min}%`,
            width: `${max - min}%`,
          }}
        />
      </div>
      {props.children(min, max, props.disabled)}
    </div>
  );
}
