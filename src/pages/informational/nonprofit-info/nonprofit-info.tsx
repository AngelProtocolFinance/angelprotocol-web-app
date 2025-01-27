import { benefits } from "content/benefits";
import Benefits from "../../@sections/benefits";
import { BottomCta } from "./bottom-cta";
import DonationFormInfo from "./donation-form-info";
import FAQ from "./faq";
import { Features } from "./features";
import FellowNonProfits from "./fellow-nonprofits";
import FiscalSponsorship from "./fiscal-sponsorship";
import Hero from "./hero";
import Investment from "./investment";
import Testimonials from "./testimonials";
import WhyBG from "./why-bg";

export default function NonprofitInfo() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <div className="bg-linear-to-br from-50% from-transparent to-peach/50">
        <Hero className="padded-container px-10 bg-transparent" />
      </div>
      <div className="bg-linear-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <FellowNonProfits className="my-20 md:my-44" />
      </div>
      <div className="bg-linear-to-br from-lilac/50 via-transparent via-50% to-lilac/50">
        <DonationFormInfo className="mt-28 padded-container" />
      </div>

      <div className="bg-linear-to-bl via-transparent via-50% from-lilac/50 to-transparent">
        <WhyBG className="mt-56 padded-container" />
      </div>
      <div className="bg-linear-to-bl from-50% from-transparent to-peach/50">
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
      </div>

      <div className="bg-linear-to-br via-transparent via-50% from-peach/50 to-transparent">
        <FiscalSponsorship className="@3xl:mt-56 padded-container" />
      </div>
      <div className="bg-linear-to-b from-transparent via-lilac/20 to-transparent">
        <Investment className="mt-56 padded-container" />
      </div>

      <div className="bg-linear-to-tr from-lilac/50 from-5% via-20% via-transparent to-transparent">
        <Features classes="padded-container mt-56" />
      </div>

      <div className="bg-linear-to-br from-lilac/50 from-5% via-20% via-transparent to-transparent">
        <Testimonials className="mt-80 padded-container" />
      </div>

      <div className="bg-linear-to-br from-transparent via-transparent to-lilac/50">
        <BottomCta className="mt-48 padded-container" />
      </div>
      <div className="bg-linear-to-bl from-lilac/50 via-transparent to-transparent">
        <FAQ classes="mt-48 padded-container" />
      </div>
    </main>
  );
}
