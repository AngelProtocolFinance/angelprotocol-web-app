import Icon, { type IconType } from "components/Icon";
import type { PropsWithChildren } from "react";
import type { EndowDesignation, EndowmentProfile } from "types/aws";

const icons: { [key in EndowDesignation]: IconType } = {
  Charity: "Heart",
  "Religious Organization": "ReligiousOrganization",
  University: "University",
  Hospital: "Hospital",
  Other: "Charity",
};

export default function EndowDesignationTag({
  endow_designation,
}: Pick<EndowmentProfile, "endow_designation">) {
  if (endow_designation === "Other") return null;

  return (
    <div className="flex flex-col items-start gap-3">
      <Tag>
        <Icon type={icons[endow_designation]} size={22} /> {endow_designation}
      </Tag>
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-full font-semibold text-sm dark:bg-blue-d4">
    {props.children}
  </div>
);
