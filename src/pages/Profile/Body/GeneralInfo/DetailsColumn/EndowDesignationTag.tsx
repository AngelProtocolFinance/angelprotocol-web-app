import { PropsWithChildren } from "react";
import { EndowmentProfile } from "types/aws";
import Icon from "components/Icon";
import { ENDOW_DESIGNATIONS } from "constants/common";

export default function EndowDesignationTag(
  props: Pick<EndowmentProfile, "endow_designation">
) {
  const endowDesignation = ENDOW_DESIGNATIONS.find(
    (option) => option.value === props.endow_designation
  );
  return endowDesignation && props.endow_designation !== "Other" ? (
    <div className="flex flex-col items-start gap-3">
      <Tag>
        <Icon type={endowDesignation.icon} size={24} /> {endowDesignation.label}
      </Tag>
    </div>
  ) : null;
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-full font-body font-semibold text-sm dark:bg-blue-d4">
    {props.children}
  </div>
);
