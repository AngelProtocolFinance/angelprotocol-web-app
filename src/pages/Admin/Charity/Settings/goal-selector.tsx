import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { Arrow, Content, Tooltip } from "components/Tooltip";
import { CircleHelp } from "lucide-react";
import type { TargetType } from "./types";

const options: { [T in TargetType]: string } = {
  smart: "Use smart milestones",
  none: "No goal or progress bar",
  fixed: "Set my own goal",
};

interface Props {
  value: TargetType;
  onChange: (type: TargetType) => void;
  classes?: string;
}
export default function GoalSelector(props: Props) {
  return (
    <RadioGroup
      value={props.value}
      onChange={props.onChange}
      aria-label="Fundraiser goal"
      className={`${props.classes ?? ""} grid gap-y-2`}
    >
      {Object.entries(options).map(([value, label]) => (
        <Field key={value} className="flex items-center gap-2">
          <Radio
            value={value}
            className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-d1"
          >
            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
          </Radio>
          <Label className="text-sm">
            {label}{" "}
            {value === "smart" && (
              <Tooltip
                tip={
                  <Content className="max-w-xs text-center bg-navy-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
                    Goals automatically adjust as you reach them - starting of
                    with $100, then $200, $400 and so on.
                    <Arrow />
                  </Content>
                }
              >
                <CircleHelp size={14} className="relative inline" />
              </Tooltip>
            )}
          </Label>
        </Field>
      ))}
    </RadioGroup>
  );
}
