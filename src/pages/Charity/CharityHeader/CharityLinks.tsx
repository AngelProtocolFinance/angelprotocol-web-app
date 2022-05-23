import { useParams } from "react-router-dom";
import { CharityParams } from "../types";
import { useProfileQueryState } from "services/aws/endowments";
import Icon, { IconTypes } from "components/Icon";

export default function CharityLinks(props: { classes?: string }) {
  const { address: charity_addr } = useParams<CharityParams>();
  const { data: profileState } = useProfileQueryState(charity_addr!);

  return (
    <div className={`${props.classes || ""} flex gap-2 items-center`}>
      {profileState?.twitter_handle && (
        <IconLink
          _iconType="Twitter"
          href={formatUrl(profileState?.twitter_handle, "twitter")}
        />
      )}
      {profileState?.linkedin_page && (
        <IconLink
          _iconType="LinkedinIn"
          href={formatUrl(profileState?.linkedin_page, "linkedin")}
        />
      )}
      {profileState?.facebook_page && (
        <IconLink
          _iconType="Facebook"
          href={formatUrl(profileState?.facebook_page, "facebook")}
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
