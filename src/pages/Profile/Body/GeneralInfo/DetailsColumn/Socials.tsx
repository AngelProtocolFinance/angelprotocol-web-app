import { useProfileContext } from "pages/Profile/ProfileContext";
import Icon, { IconTypes } from "components/Icon";

export default function Socials({ className }: { className: string }) {
  const profile = useProfileContext();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
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
          iconType="Twitter"
        />
      )}
    </div>
  );
}

const SocialsIcon = (props: { href: string; iconType: IconTypes }) => (
  <a
    href={props.href}
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 border border-gray-d2 rounded hover:text-blue-l1 hover:border-blue-l1 active:text-blue dark:border-white"
  >
    <Icon type={props.iconType} className="w-6 h-6" />
  </a>
);
