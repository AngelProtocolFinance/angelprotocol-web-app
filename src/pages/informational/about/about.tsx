// import { benefits } from "content/benefits";
// import Benefits from "../../@sections/Benefits";
import { Hero } from "./hero";
import { Manifesto } from "./manifesto";
import { Quote } from "./quote";
import { Section2 } from "./section-2";
// import { BottomCta } from "./BottomCta";
// import DonationFormInfo from "./DonationFormInfo";
// import FellowNonProfits from "./FellowNonProfits";
// import FiscalSponsorship from "./FiscalSponsorship";
// import Hero from "./Hero";
// import Testimonials from "./Testimonials";
// import WhyBG from "./WhyBG";
// import FAQ from "./faq";
// import { Features } from "./features";
// import Investment from "./investment";

export function About() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Hero classes="padded-container" />
        {/* <Hero className="padded-container px-10 bg-transparent" /> */}
      </div>
      <div className="bg-gradient-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <Section2 className="mt-28 padded-container" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50 via-transparent via-50% to-lilac/50">
        <Manifesto className="mt-56 padded-container" />
        {/* <DonationFormInfo className="mt-28 padded-container" /> */}
      </div>

      <div className="bg-gradient-to-bl via-transparent via-50% from-lilac/50 to-transparent">
        <Quote className="padded-container" />
      </div>
      <div className="bg-gradient-to-bl from-50% from-transparent to-peach/50"></div>

      <div className="bg-gradient-to-br via-transparent via-50% from-peach/50 to-transparent">
        {/* <FiscalSponsorship className="@xl:mt-56 padded-container" /> */}
      </div>
      <div className="bg-gradient-to-b from-transparent via-lilac/20 to-transparent">
        {/* <Investment className="mt-56 padded-container" /> */}
      </div>

      <div className="bg-gradient-to-tr from-lilac/50 from-5% via-20% via-transparent to-transparent">
        {/* <Features classes="padded-container mt-56" /> */}
      </div>

      <div className="bg-gradient-to-br from-lilac/50 from-5% via-20% via-transparent to-transparent">
        {/* <Testimonials className="mt-80 padded-container" /> */}
      </div>

      <div className="bg-gradient-to-br from-transparent via-transparent to-lilac/50">
        {/* <BottomCta className="mt-48 padded-container" /> */}
      </div>
      <div className="bg-gradient-to-bl from-lilac/50 via-transparent to-transparent">
        {/* <FAQ classes="mt-48 padded-container" /> */}
      </div>
    </main>
  );
}
