import { DappLogo } from "components/Image";
import Seo from "components/Seo";
import { Responsive } from "pages/@sections/testimonials";
import { BottomCta } from "./bottom-cta";
import { Brands } from "./brands";
import { DonationFormInfo } from "./donation-form-info";
import { Footer } from "./footer";
import { Top } from "./top";
import { WhyBG } from "./why-bg";

export function Component() {
  return (
    <main className="w-full grid content-start @container">
      <div className="padded-container pt-6 pb-2">
        <DappLogo classes="w-48 h-12" />
      </div>
      <Seo
        title="US Nonprofits"
        description="Simplify Fundraising, Maximize Impact: Claim Your Better Giving Account Today"
      />
      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Top className="padded-container px-10 bg-transparent" />
      </div>
      <div className="bg-gradient-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <Brands className="my-20 md:my-44" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50  via-transparent via-50% to-transparent">
        <WhyBG className="mt-10 padded-container" />
      </div>
      <div className="bg-gradient-to-br from-transparent via-transparent via-50% to-lilac/50">
        <DonationFormInfo className="mt-60 padded-container" />
      </div>
      <div className="bg-gradient-to-bl from-lilac/50  via-50% via-transparent to-transparent">
        <Responsive
          horizontal="block @3xl:hidden mt-40"
          vertical="hidden md:grid mt-40 md:mt-80 padded-container"
        />
      </div>
      <div className="mt-48">
        <BottomCta className="padded-container" />
      </div>
      <Footer classes="mt-20" />
    </main>
  );
}