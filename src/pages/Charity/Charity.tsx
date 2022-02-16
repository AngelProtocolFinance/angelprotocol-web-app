import ImageWrapper from "components/ImageWrapper/ImageWrapper";
import { CharityProfileTabLoader } from "components/Loader/Charity";
import { RouteComponentProps } from "react-router-dom";
import { useProfile } from "services/aws/endowments/queriers";
import CharityInfoNav from "./CharityInfoNav";
import { DonationInfo } from "./DonationInfo";
import InfoTabs from "./InfoTabs/InfoTabs";
import { CharityParam } from "./types";

const Charity = (props: RouteComponentProps<CharityParam>) => {
  const endowment_addr = props.match.params.address;
  const { profile, isProfileLoading } = useProfile(endowment_addr);

  return (
    <section className="container mx-auto grid pb-16 content-start gap-0">
      <div className="flex flex-col grid-rows-1 lg:grid-rows-2 lg:flex-row items-start w-full md:mx-auto md:container min-h-r15 gap-2 lg:mt-3 p-5">
        <DonationInfo />
        <div className="flex-grow w-full items-center text-center bg-indigo 2xl:mb-0">
          <ImageWrapper
            height="300"
            width="100%"
            src={profile.charity_image}
            alt="charity image"
            classes="max-h-modal w-full bg-gray-100 rounded-2xl 2xl:-mt-6 shadow-md mb-1 object-cover object-center"
          />
          {isProfileLoading ? (
            <CharityProfileTabLoader />
          ) : (
            <>
              <CharityInfoNav />
              <InfoTabs />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Charity;
