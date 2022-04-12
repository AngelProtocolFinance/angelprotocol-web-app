import { useParams } from "react-router-dom";
import { useProfile } from "services/aws/endowments/queriers";
import { CharityParam } from "./types";
import { app, site } from "constants/routes";
import { Link } from "react-router-dom";
import Icon from "components/Icons/Icons";
import CharityStats from "./CharityStats";
import CharityHeader from "./CharityHeader/CharityHeader";
import CharityContent from "./CharityContent/CharityContent";
import ContentLoader from "components/ContentLoader/ContentLoader";
// import { useEndowmentProfile } from "services/terra/account/queriers";

const Charity = () => {
  const { address: endowment_addr } = useParams<CharityParam>();
  const { profile, isProfileLoading } = useProfile(endowment_addr!);
  // const { isProfileLoading, profile } = useEndowmentProfile(endowment_addr!);

  if (isProfileLoading) return <CharitySkeleton />;
  return (
    <section className="padded-container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-aa1 gap-4 pb-16 content-start">
      <Link
        to={`${site.app}/${app.marketplace}`}
        className="lg:col-span-2 flex items-center gap-1 font-heading uppercase font-bold text-sm text-white hover:text-angel-blue"
      >
        <Icon type="ArrowBack" size={15} /> back to marketplace
      </Link>
      <CharityHeader {...{ ...profile }} />
      <CharityContent
        {...{
          ...profile,
          classes: "row-span-2",
        }}
      />
      <CharityStats {...{ ...profile, classes: "hidden lg:block mt-4" }} />
    </section>
  );
};

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

export default Charity;
