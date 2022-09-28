import Icon, { IconTypes } from "components/Icon";
import { useProfile } from "..";

export default function CharityLinks(props: { classes?: string }) {
  const profile = useProfile();
  return (
    <div className={`${props.classes || ""} flex gap-2 items-center`}>
      {profile?.social_media_urls.twitter && (
        <IconLink
          _iconType="Twitter"
          href={formatUrl(profile?.social_media_urls.twitter, "twitter")}
        />
      )}
      {profile?.social_media_urls.linkedin && (
        <IconLink
          _iconType="LinkedinIn"
          href={formatUrl(profile?.social_media_urls.linkedin, "linkedin")}
        />
      )}
      {profile?.social_media_urls.facebook && (
        <IconLink
          _iconType="Facebook"
          href={formatUrl(profile?.social_media_urls.facebook, "facebook")}
        />
      )}
      {profile?.url && <IconLink _iconType="Globe" href={profile.url} />}
    </div>
  );
}

function IconLink({
  _iconType,
  ...restProps
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  _iconType: IconTypes;
}) {
  return (
    <a
      {...restProps}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 p-2 rounded-full text-blue-l2 hover:text-blue-l4 inline-flex items-center border border-blue-l2 hover:border-blue-l4 focus:border-white"
    >
      <Icon type={_iconType} size={25} />
    </a>
  );
}

//<props.Icon color="#3FA9F5" size={props.size} />
function formatUrl(
  url: string,
  socialMedia: "facebook" | "linkedin" | "twitter"
) {
  if (/http/.test(url)) {
    return url;
  } else {
    return `https://${socialMedia}.com/${url}`;
  }
}
