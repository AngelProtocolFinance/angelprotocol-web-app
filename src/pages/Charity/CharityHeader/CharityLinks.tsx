import { useConnectedWallet } from "@terra-money/wallet-provider";
import Icon, { IconTypes } from "components/Icons/Icons";
import { app, site } from "constants/routes";
import { Link } from "react-router-dom";
import { LinkProps, useParams } from "react-router-dom";
import { useProfileState } from "services/aws/endowments/states";
import { CharityParam } from "../types";

export default function CharityLinks(props: { classes?: string }) {
  const { address: charity_addr } = useParams<CharityParam>();
  const { profileState } = useProfileState(charity_addr!);
  const wallet = useConnectedWallet();
  const isCharityOwner = wallet?.walletAddress === profileState.charity_owner;

  return (
    <div className={`${props.classes || ""} flex gap-1 items-center`}>
      {profileState.url && (
        <IconLink _iconType="Globe" href={profileState.url} />
      )}

      {profileState.twitter_handle && (
        <IconLink
          _iconType="Twitter"
          href={formatUrl(profileState.twitter_handle, "twitter")}
        />
      )}
      {profileState.linkedin_page && (
        <IconLink
          _iconType="Linkedin"
          href={formatUrl(profileState.linkedin_page, "linkedin")}
        />
      )}

      {profileState.facebook_page && (
        <IconLink
          _iconType="Facebook"
          href={formatUrl(profileState.facebook_page, "facebook")}
        />
      )}

      {isCharityOwner && (
        <IconRouteLink
          _iconType="Edit"
          to={`${site.app}/${app.charity_edit}/${charity_addr}`}
        />
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
      className={linkStyle}
    >
      <Icon type={_iconType} size={25} />
    </a>
  );
}

function IconRouteLink({
  _iconType,
  ...restProps
}: LinkProps & { _iconType: IconTypes }) {
  return (
    <Link {...restProps} className={linkStyle}>
      <Icon type={_iconType} size={25} />
    </Link>
  );
}

const linkStyle = "text-angel-blue hover:text-white";

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
