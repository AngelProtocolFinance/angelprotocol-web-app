import { LinkProps, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CharityParams } from "./types";
import { useProfileQuery } from "services/aws/endowments";
import ContentLoader from "components/ContentLoader";
import Icon, { IconTypes } from "components/Icon";
import { appRoutes, siteRoutes } from "constants/routes";
import CharityContent from "./CharityContent/CharityContent";
import CharityHeader from "./CharityHeader/CharityHeader";
import CharityStats from "./CharityStats";

export default function Charity() {
  const { address: endowment_addr } = useParams<CharityParams>();
  const { data, isLoading, isError } = useProfileQuery(endowment_addr!);

  if (isLoading) return <CharitySkeleton />;
  if (isError || !data) return <PageError />;
  return (
    <section className="padded-container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-aa1 gap-4 pb-16 content-start">
      <div className="lg:col-span-2 flex gap-2">
        <LinkIcon
          to={`${siteRoutes.app}/${appRoutes.marketplace}`}
          _iconType="ArrowBack"
        >
          back to marketplace
        </LinkIcon>
        {false /**is charity owner */ && (
          <LinkIcon
            to={`${siteRoutes.app}/${appRoutes.charity_edit}/${endowment_addr}`} //change to multisig edit
            _iconType="Edit"
            className="ml-auto border-r border-white/30 pr-2"
          >
            edit profile
          </LinkIcon>
        )}
      </div>

      <CharityHeader {...data} />
      <CharityContent {...data} classes="row-span-2" />
      <CharityStats {...data} classes="hidden lg:block mt-4" />
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

function PageError() {
  return (
    <section
      className="padded-container grid content-center place-items-center gap-2
  "
    >
      <Icon type="Warning" size={30} className="text-red-400" />
      <p className="text-red-400 text-lg">Failed to load charity profile</p>
      <Link
        to={`${siteRoutes.app}/${appRoutes.marketplace}`}
        className="text-white/80 hover:text-angel-blue text-sm"
      >
        back to Marketplace
      </Link>
    </section>
  );
}
