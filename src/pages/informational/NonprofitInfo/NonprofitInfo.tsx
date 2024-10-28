import Seo from "components/Seo";
import { benefits } from "content/benefits";
import Benefits from "../../@sections/Benefits";
import BottomCta from "./BottomCta";
import DonationFormInfo from "./DonationFormInfo";
import FellowNonProfits from "./FellowNonProfits";
import FiscalSponsorship from "./FiscalSponsorship";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import WhyBG from "./WhyBG";
import Investment from "./investment";

export function NonprofitInfo() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <Seo
        title="For Nonprofits"
        description="Accept any type of donation, anywhere in the world"
      />
      <Hero className="padded-container px-10" />
      <FellowNonProfits className="my-44" />
      <DonationFormInfo className="mt-28 padded-container" />
      <WhyBG className="mt-56 padded-container" />
      <Benefits
        className="mt-56 padded-container px-10"
        subheading="Simplify your fundraising"
        heading="Your One-Stop Fundraising Solution"
        body="Donation processing and fund management in one platform"
        items={benefits.nonprofits.map(({ cardBgClass, ...i }) => ({
          ...i,
          cardBgClass: "",
        }))}
      />
      <FiscalSponsorship className="@xl:mt-56 padded-container" />
      <Investment className="mt-56 padded-container" />
      <Testimonials className="mt-80 padded-container" />
      <BottomCta className="mt-40 mb-20 max-w-5xl @5xl:max-w-6xl justify-self-center mx-4 @md:mx-10" />
    </main>
  );
}
