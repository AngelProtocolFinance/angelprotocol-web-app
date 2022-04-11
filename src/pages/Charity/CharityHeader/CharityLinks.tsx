import Icon, { IconTypes } from "components/Icons/Icons";
import { app, site } from "constants/routes";
import { Link } from "react-router-dom";
import { LinkProps, useParams } from "react-router-dom";
import { useEndowmentCWs } from "services/terra/account/queriers";
import { useEndowmentProfileState } from "services/terra/account/states";
import { useMember } from "services/terra/admin/queriers";
import { CharityParam } from "../types";

export default function CharityLinks(props: { classes?: string }) {
  const { address: charity_addr } = useParams<CharityParam>();
  const { profileState } = useEndowmentProfileState(charity_addr!);
  const { cwContracts, isCWContractsLoading } = useEndowmentCWs(charity_addr);
  const { member } = useMember(cwContracts, isCWContractsLoading);
  const isUserAdminMember = !!member.weight;

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
        <IconLink _iconType="Globe" href={profileState?.url} />
      )}
      {isUserAdminMember && (
        <IconRouteLink
          _iconType="Edit"
          to={`${site.app}/${app.charity_edit}/${charity_addr}`}
        />
      )}
      {isUserAdminMember && (
        <IconRouteLink
          _iconType="Admin"
          to={`${site.app}/${app.endowment_admin}/${charity_addr}`}
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

const linkStyle =
  "h-10 w-10 p-2 rounded-full text-angel-blue inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey";

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
