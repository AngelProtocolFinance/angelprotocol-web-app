import { LinkProps, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProfile } from "services/aws/endowments/queriers";
import { useEndowmentCWs } from "services/terra/account/queriers";
import { useMember } from "services/terra/admin/queriers";
import ContentLoader from "components/ContentLoader/ContentLoader";
import Icon, { IconTypes } from "components/Icons/Icons";
import { app, site } from "constants/routes";
import CharityContent from "./CharityContent/CharityContent";
import CharityHeader from "./CharityHeader/CharityHeader";
import CharityStats from "./CharityStats";
import { CharityParam } from "./types";

export default function Charity() {
  const { address: endowment_addr } = useParams<CharityParam>();
  const { profile, isProfileLoading } = useProfile(endowment_addr!);
  const { cwContracts, isCWContractsLoading } = useEndowmentCWs(
    endowment_addr!
  );
  const { member, isMemberLoading } = useMember(
    cwContracts,
    isCWContractsLoading
  );
  const isResourcesLoading =
    isProfileLoading || isCWContractsLoading || isMemberLoading;

  const isUserAdminMember = !!member.weight;

  if (isResourcesLoading) return <CharitySkeleton />;
  return (
    <section className="padded-container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-aa1 gap-4 pb-16 content-start">
      <div className="lg:col-span-2 flex gap-2">
        <LinkIcon to={`${site.app}/${app.marketplace}`} _iconType="ArrowBack">
          back to marketplace
        </LinkIcon>
        {isUserAdminMember && (
          <LinkIcon
            to={`${site.app}/${app.charity_edit}/${endowment_addr}`} //change to multisig edit
            _iconType="Edit"
            className="ml-auto border-r border-white/30 pr-2"
          >
            edit profile
          </LinkIcon>
        )}
        {isUserAdminMember && (
          <LinkIcon
            to={`${site.app}/${app.endowment_admin}/${endowment_addr}`} //change to updateProfile from RC-web-profile
            _iconType="Admin"
          >
            admin
          </LinkIcon>
        )}
      </div>

      <CharityHeader {...profile} />
      <CharityContent {...profile} classes="row-span-2" />
      <CharityStats {...profile} classes="hidden lg:block mt-4" />
    </section>
  );
}

function LinkIcon({
  _iconType,
  children,
  className,
  ...restProps
}: LinkProps & { _iconType: IconTypes }) {
  return (
    <Link
      {...restProps}
      className={`flex items-center gap-1 font-heading uppercase font-bold text-sm text-white hover:text-angel-blue ${className}`}
    >
      <Icon type={_iconType} className="text-xl" />
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}

function CharitySkeleton() {
  return (
    <section className="padded-container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-aa1 gap-4 pb-16 content-start opacity-20">
      <ContentLoader className="w-48 h-10 lg:col-span-2" />
      <ContentLoader className="w-full rounded-md" />
      <div className="w-full row-span-2 grid grid grid-rows-aa1">
        <ContentLoader className="w-full h-[300px] rounded-md" />
        <ContentLoader className="w-full h-10 mt-2 rounded-md" />
        <ContentLoader className="w-full h-full mt-2 rounded-md" />
      </div>
      <ContentLoader className="hidden lg:block mt-2 h-full w-full rounded-md" />
    </section>
  );
}
