import DonationFormInfo from "./DonationFormInfo";
import Hero from "./Hero";
import WhyBG from "./WhyBG";

export default function Nonprofits() {
  return (
    <div className="w-full grid content-start pb-16 padded-container @container">
      <Hero />
      <DonationFormInfo className="mt-28" />
      <WhyBG className="mt-40" />
    </div>
  );
}
