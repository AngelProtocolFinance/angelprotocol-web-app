import DonationFormInfo from "./DonationFormInfo";
import Hero from "./Hero";

export default function Nonprofits() {
  return (
    <div className="w-full grid gap-y-20 content-start pb-16 padded-container @container">
      <Hero />
      <DonationFormInfo />
    </div>
  );
}
