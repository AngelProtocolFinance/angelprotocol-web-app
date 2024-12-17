import Seo from "components/Seo";
import { BottomCta } from "./bottom-cta";
import { Brands } from "./brands";
import { DonationFormInfo } from "./donation-form-info";
import { Stories } from "./stories";
import { Top } from "./top";
import { WhyBG } from "./why-bg";

export function Component() {
  return (
    <main className="w-full grid content-start pb-16 @container">
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
        <DonationFormInfo className="mt-28 padded-container" />
      </div>

      <div className="bg-gradient-to-bl from-lilac/50  via-50% via-transparent to-transparent">
        <Stories className="mt-80 padded-container" />
      </div>

      <div className="mt-48">
        <BottomCta className="padded-container" />
      </div>
    </main>
  );
}
