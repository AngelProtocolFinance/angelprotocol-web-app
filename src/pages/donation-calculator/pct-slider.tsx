import * as Slider from "@radix-ui/react-slider";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { CircleHelpIcon } from "lucide-react";

interface ProcessingFeeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  classes?: string;
  tooltip?: string;
}

export function PctSlider({
  label,
  value,
  onChange,
  classes = "",
  tooltip,
}: ProcessingFeeSliderProps) {
  return (
    <div className={`w-full max-w-md ${classes}`}>
      <div className="flex items-center mb-2 gap-x-1">
        <p className="text-sm font-semibold">{label}</p>
        {tooltip && (
          <Tooltip
            tip={
              <Content className="max-w-xs text-center bg-gray-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
                {tooltip}
                <Arrow />
              </Content>
            }
          >
            <CircleHelpIcon size={14} className="relative inline" />
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-8">
        <div className="flex-1">
          <Slider.Root
            className="relative flex w-full touch-none select-none items-center"
            value={[value]}
            max={1}
            min={0}
            step={0.01}
            onValueChange={([x]) => onChange(x)}
          >
            <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-l4">
              <Slider.Range className="absolute h-full bg-blue-d1" />
            </Slider.Track>
            <Slider.Thumb className="block size-4 rounded-full border-2 border-white bg-white shadow-md focus:outline-none focus-visible:ring focus-visible:ring-blue focus-visible:ring-opacity-75" />
          </Slider.Root>
        </div>
        <div className="text-sm text-right">{(value * 100).toFixed(1)}%</div>
      </div>
    </div>
  );
}
