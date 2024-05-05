import { benefits } from "content/benefits";
import Benefits from "../../@sections/Benefits";
import HeroBottom from "../../@sections/HeroBottom";
import DonationFormInfo from "./DonationFormInfo";
import Hero from "./Hero";

export default function DonorInfo({ className = "" }) {
  return (
    <main className={`${className} grid @container`}>
      <Hero className="padded-container px-10" />
      <HeroBottom className="mb-10 mt-20" />
      <DonationFormInfo className="mt-20 padded-container" />
      <Benefits
        className="mt-56 padded-container px-10"
        subheading="Bridge to better"
        heading="Nonprofit Sustainability Fund: Give today, give forever"
        body="Access our free fundraising technology and tools."
        items={benefits.donors}
      />
    </main>
  );
}
