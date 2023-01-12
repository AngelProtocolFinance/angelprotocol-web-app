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
          Verification required <Icon type="Info" size={24} />
        </Tag>
      )}
      <Tag>Registered Non-Profit</Tag>
      {profile.categories.sdgs.map((s) => (
        <Tag key={s.value}>
          SDG #{s.value} : {s.label}
        </Tag>
      ))}
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-full font-body font-semibold text-sm dark:bg-blue-d4">
    {props.children}
  </div>
);
