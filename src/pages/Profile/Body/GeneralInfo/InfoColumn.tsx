import { PropsWithChildren } from "react";
import { useProfileContext } from "pages/Profile/ProfileContext";
import Icon, { IconTypes } from "components/Icon";
import { unsdgs } from "constants/unsdgs";
import DonateButton from "../DonateButton";

export default function InfoColumn() {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col gap-6 w-full lg:w-96 h-[928px] p-8 box-border border border-gray-l2 rounded text-gray-d2">
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

      <p className="font-sans font-normal text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra
        tortor vitae, ornare ac, ultricies lacus. In sed arcu enim eu. Risus nam
        egestas sit id eget.
      </p>

      <Socials />
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-[20px] font-body font-semibold text-sm">
    {props.children}
  </div>
);

function Socials() {
  const profile = useProfileContext();

  return (
    <div className="flex items-center gap-3">
      {profile.social_media_urls.facebook && (
        <SocialsIcon
          href={profile.social_media_urls.facebook}
          iconType="Facebook"
        />
      )}
      {profile.social_media_urls.linkedin && (
        <SocialsIcon
          href={profile.social_media_urls.linkedin}
          iconType="LinkedinIn"
        />
      )}
      {profile.social_media_urls.twitter && (
        <SocialsIcon
          href={profile.social_media_urls.twitter}
          iconType="Telegram"
        />
      )}
    </div>
  );
}

const SocialsIcon = (props: { href: string; iconType: IconTypes }) => (
  <a
    href={props.href}
    rel="noopener noreferrer"
    className="flex items-center justify-center p-1 w-10 h-10 border border-gray-d2 rounded"
  >
    <Icon type={props.iconType} />
  </a>
);
