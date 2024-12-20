import { DappLogo } from "components/Image";
import Seo from "components/Seo";
import { Horizontal } from "pages/@sections/testimonials";
import { BottomCta } from "./bottom-cta";
import { Brands } from "./brands";
import { DonationFormInfo } from "./donation-form-info";
import { Feature } from "./feature";
import { Top } from "./top";

export function Component() {
  return (
    <main className="w-full grid content-start pb-16 @container">
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
        <Brands className="my-20" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50 via-transparent via-50% to-transparent">
        <Feature className="padded-container" />
      </div>
      <div className="bg-gradient-to-br from-transparent via-transparent via-50% to-lilac/50">
        <DonationFormInfo className="mt-60 w-full" />
      </div>
      <div className="bg-gradient-to-bl from-lilac/50  via-50% via-transparent to-transparent">
        <Horizontal
          heading="Nonprofit Success Stories"
          classes={{
            container: "mt-56 padded-container",
            quote: "w-20",
            heading: "text-2xl",
          }}
        />
      </div>
      <div className="mt-48">
        <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10 padded-container" />
      </div>
    </main>
  );
}
