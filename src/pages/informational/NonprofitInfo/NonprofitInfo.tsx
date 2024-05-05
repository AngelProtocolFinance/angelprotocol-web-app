import { benefits } from "content/benefits";
import Benefits from "./Benefits";
import BottomCta from "./BottomCta";
import DonationFormInfo from "./DonationFormInfo";
import FellowNonProfits from "./FellowNonProfits";
import FiscalSponsorship from "./FiscalSponsorship";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import WhyBG from "./WhyBG";

export default function Nonprofits() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <Hero className="padded-container px-10" />
      <FellowNonProfits className="my-44" />
      <DonationFormInfo className="mt-28 padded-container" />
      <WhyBG className="mt-56 padded-container" />
      <Benefits
        className="mt-56 padded-container px-10"
        subheading="Bridge to better"
        heading="Amplifying impact for all"
        body="Join our global community and amplify your charitable giving."
        items={benefits.nonprofits}
      />
      <FiscalSponsorship className="@xl:mt-56 padded-container" />
      <Testimonials className="mt-40 padded-container" />
      <BottomCta className="mt-40 mb-20 max-w-5xl @5xl:max-w-6xl justify-self-center mx-4 @md:mx-10" />
    </main>
  );
}
