import { PropsWithChildren } from "react";
import { useProfileContext } from "pages/Profile/ProfileContext";
import Icon from "components/Icon";
import { unsdgs } from "constants/unsdgs";
import DonateButton from "../DonateButton";

export default function InfoColumn() {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col gap-6 w-full lg:w-96 h-[928px] p-8 box-border border border-gray-l2 rounded">
      <DonateButton />

      <div className="flex flex-col items-start gap-3">
        {profile.kyc_donors_only && (
          <Tag>
            Verification required <Icon type="Warning" />
          </Tag>
        )}
        <Tag>501 (c) Non-profit</Tag>
        {profile.categories.sdgs.map((unsdg_num) => (
          <Tag>
            SDG #{unsdg_num} : {unsdgs[unsdg_num].title}
          </Tag>
        ))}
      </div>
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-[20px] font-body font-semibold text-sm text-gray-d2">
    {props.children}
  </div>
);
