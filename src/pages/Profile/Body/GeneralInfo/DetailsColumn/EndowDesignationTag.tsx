import {
  Church,
  Heart,
  HeartHandshake,
  Hospital,
  University,
} from "lucide-react";
import type { PropsWithChildren } from "react";
import type { EndowDesignation, EndowmentProfile } from "types/aws";

const icons: {
  [key in EndowDesignation]: typeof Church;
} = {
  Charity: Heart,
  "Religious Organization": Church,
  University: University,
  Hospital: Hospital,
  Other: HeartHandshake,
};

export default function EndowDesignationTag({
  endow_designation,
}: Pick<EndowmentProfile, "endow_designation">) {
  if (endow_designation === "Other") return null;
  const Ico = icons[endow_designation];

  return (
    <div className="flex flex-col items-start gap-3">
      <Tag>
        <Ico size={20} /> {endow_designation}
      </Tag>
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-full font-semibold text-sm dark:bg-blue-d4">
    {props.children}
  </div>
);
