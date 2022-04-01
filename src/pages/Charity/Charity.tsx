import { useParams } from "react-router-dom";
import { useProfile } from "services/aws/endowments/queriers";
import { CharityParam } from "./types";
import { app, site } from "constants/routes";
import { Link } from "react-router-dom";
import Icon from "components/Icons/Icons";
import CharityStats from "./CharityStats";
import CharityHeader from "./CharityHeader/CharityHeader";
import CharityContent from "./CharityContent/CharityContent";

const Charity = () => {
  const { address: endowment_addr } = useParams<CharityParam>();
  const { profile } = useProfile(endowment_addr!);

  return (
    <section className="padded-container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-aa1 gap-4 pb-16 content-start">
      <Link
        to={`${site.app}/${app.marketplace}`}
        className="lg:col-span-2 flex items-center gap-1 font-heading uppercase font-bold text-sm text-white hover:text-angel-blue "
      >
        <Icon type="ArrowBack" size={15} /> back to marketplace
      </Link>

      <CharityHeader {...{ ...profile }} />
      <CharityContent
        {...{
          ...profile,
          classes: "row-span-2 lg:border-l-2 lg:border-white/10 lg:pl-2",
        }}
      />
      <CharityStats
        {...{ ...profile, classes: "hidden lg:block justify-self-end" }}
      />
      {/* <DonationInfo /> */}
    </section>
  );
};

export default Charity;
