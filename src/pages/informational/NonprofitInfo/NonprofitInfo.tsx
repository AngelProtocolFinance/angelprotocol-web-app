import DonationFormInfo from "./DonationFormInfo";
import FellowNonProfits from "./FellowNonProfits";
import Hero from "./Hero";
import WhyBG from "./WhyBG";

export default function Nonprofits() {
  return (
    <div className="w-full grid content-start pb-16 @container">
      <Hero className="padded-container" />
      <FellowNonProfits className="my-20" />
      <DonationFormInfo className="mt-28" />
      <WhyBG className="mt-40" />
    </div>
  );
}
