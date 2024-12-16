import Seo from "components/Seo";
import { BottomCta } from "./BottomCta";
import DonationFormInfo from "./DonationFormInfo";
import FellowNonProfits from "./FellowNonProfits";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import WhyBG from "./WhyBG";

export function NonprofitInfo() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <Seo
        title="For Nonprofits"
        description="Accept any type of donation, anywhere in the world"
      />
      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Hero className="padded-container px-10 bg-transparent" />
      </div>
      <div className="bg-gradient-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <FellowNonProfits className="my-20 md:my-44" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50  via-transparent via-50% to-transparent">
        <WhyBG className="mt-56 padded-container" />
      </div>
      <div className="bg-gradient-to-br from-transparent via-transparent via-50% to-lilac/50">
        <DonationFormInfo className="mt-28 padded-container" />
      </div>

      <div className="bg-gradient-to-bl from-lilac/50  via-50% via-transparent to-transparent">
        <Testimonials className="mt-80 padded-container" />
      </div>

      <div className="">
        <BottomCta className="mt-48 padded-container" />
      </div>
    </main>
  );
}
