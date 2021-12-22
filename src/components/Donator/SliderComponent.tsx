import Slider, { SliderProps } from "rc-slider";
import "rc-slider/assets/index.css";

export default function SliderComponent(props: SliderProps) {
  const { min, max, value, onChange, onAfterChange } = props;

  return (
    <div className="w-3/4 flex flex-col gap-2">
      <span className="text-dark-grey text-xs 3xl:text-sm font-semibold">
        Percentage<sup className="text-red-500">*</sup>
      </span>
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onAfterChange={onAfterChange}
        className="w-full"
        railStyle={{
          height: 6,
          backgroundColor: "lightgrey",
        }}
        // bg color is the same as angel blue, but since rc-slider doesn't support tailwind, we needed to hardcode the color
        trackStyle={{ height: 6, backgroundColor: "#3FA9F5" }}
        handleStyle={{
          borderColor: "white",
          height: 24,
          width: 24,
          marginTop: -9,
          backgroundColor: "white",
        }}
      />
      <p className="flex justify-between ">
        <span>{min}%</span>
        <span>{max}%</span>
      </p>
    </div>
  );
}
