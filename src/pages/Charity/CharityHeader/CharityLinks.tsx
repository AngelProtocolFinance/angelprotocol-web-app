import { useParams } from "react-router-dom";
import { IconTypes } from "@types-component/icons";
import { CharityParams } from "@types-page/charity";
import { useEndowmentProfileState } from "services/terra/account/states";
import Icon from "components/Icons/Icons";

export default function CharityLinks(props: { classes?: string }) {
  const { address: charity_addr } = useParams<CharityParams>();
  const { profileState } = useEndowmentProfileState(charity_addr!);

  return (
    <div className={`${props.classes || ""} flex gap-2 items-center`}>
      {profileState?.social_media_urls.twitter && (
        <IconLink
          _iconType="Twitter"
          href={formatUrl(profileState?.social_media_urls.twitter, "twitter")}
        />
      )}
      {profileState?.social_media_urls.linkedin && (
        <IconLink
          _iconType="Linkedin"
          href={formatUrl(profileState?.social_media_urls.linkedin, "linkedin")}
        />
      )}
      {profileState?.social_media_urls.facebook && (
        <IconLink
          _iconType="Facebook"
          href={formatUrl(profileState?.social_media_urls.facebook, "facebook")}
        />
      )}
      {profileState?.url && (
        <IconLink _iconType="Globe" href={profileState.url} />
      )}
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
      className="h-10 w-10 p-2 rounded-full text-angel-blue inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey"
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
