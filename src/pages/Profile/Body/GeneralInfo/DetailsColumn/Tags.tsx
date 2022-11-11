import { PropsWithChildren } from "react";
import { useProfileContext } from "pages/Profile/ProfileContext";
import Icon from "components/Icon";
import { unsdgs } from "constants/unsdgs";

export default function Tags() {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col items-start gap-3">
      {profile.kyc_donors_only && (
        <Tag>
          Verification required <Icon type="Info" />
        </Tag>
      )}
      <Tag>501 (c) Non-profit</Tag>
      {profile.categories.sdgs.map((unsdg_num) => (
        <Tag key={unsdg_num}>
          SDG #{unsdg_num} : {unsdgs[unsdg_num].title}
        </Tag>
      ))}
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-[20px] font-body font-semibold text-sm dark:bg-blue-d5">
    {props.children}
  </div>
);
