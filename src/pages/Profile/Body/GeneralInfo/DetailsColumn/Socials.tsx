import ExtLink from "components/ExtLink";
import Icon, { IconType } from "components/Icon";
import { EndowmentProfile } from "types/aws";

export default function Socials(
  props: Pick<EndowmentProfile, "social_media_urls">
) {
  const { facebook, linkedin, twitter, discord, instagram, youtube, tiktok } =
    props.social_media_urls;
  return (
    <div className="flex items-center gap-3">
      {facebook && <SocialsIcon href={facebook} iconType="Facebook" />}
      {linkedin && <SocialsIcon href={linkedin} iconType="LinkedinIn" />}
      {twitter && <SocialsIcon href={twitter} iconType="Twitter" />}
      {discord && <SocialsIcon href={discord} iconType="Discord" />}
      {instagram && <SocialsIcon href={instagram} iconType="Instagram" />}
      {youtube && <SocialsIcon href={youtube} iconType="Youtube" />}
      {tiktok && <SocialsIcon href={tiktok} iconType="Tiktok" />}
    </div>
  );
}

const SocialsIcon = (props: { href: string; iconType: IconType }) => (
  <ExtLink
    href={props.href}
    aria-label={props.iconType}
    className="flex items-center justify-center w-10 h-10 border border-gray-d2 rounded hover:text-blue-l1 hover:border-blue-l1 active:text-blue dark:border-white"
  >
    <Icon type={props.iconType} className="w-6 h-6" />
  </ExtLink>
);
