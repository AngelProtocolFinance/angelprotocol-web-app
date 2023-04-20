import { EndowmentProfile } from "types/aws";
import ExtLink from "components/ExtLink";
import Icon, { IconType } from "components/Icon";

export default function Socials(
  props: Pick<EndowmentProfile, "social_media_urls">
) {
  return (
    <div className="flex items-center gap-3">
      {props.social_media_urls.facebook && (
        <SocialsIcon
          href={props.social_media_urls.facebook}
          iconType="Facebook"
        />
      )}
      {props.social_media_urls.linkedin && (
        <SocialsIcon
          href={props.social_media_urls.linkedin}
          iconType="LinkedinIn"
        />
      )}
      {props.social_media_urls.twitter && (
        <SocialsIcon
          href={props.social_media_urls.twitter}
          iconType="Twitter"
        />
      )}
      {props.social_media_urls.discord && (
        <SocialsIcon
          href={props.social_media_urls.discord}
          iconType="Discord"
        />
      )}
      {props.social_media_urls.instagram && (
        <SocialsIcon
          href={props.social_media_urls.instagram}
          iconType="Instagram"
        />
      )}
      {props.social_media_urls.youtube && (
        <SocialsIcon
          href={props.social_media_urls.youtube}
          iconType="Youtube"
        />
      )}
      {props.social_media_urls.tiktok && (
        <SocialsIcon href={props.social_media_urls.tiktok} iconType="Tiktok" />
      )}
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
