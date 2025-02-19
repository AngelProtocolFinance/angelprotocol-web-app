import type { MetaFunction } from "@vercel/remix";
import { DappLogo } from "components/image";
import { metas } from "helpers/seo";
import { BottomCta } from "./bottom-cta";
import Brands from "./brands";
import { DonationFormInfo } from "./donation-form-info";
import { Footer } from "./footer";
import { Top } from "./top";
import { WhyBG } from "./why-bg";

export const meta: MetaFunction = () =>
  metas({
    title: "US Nonprofits",
    description:
      "Simplify Fundraising, Maximize Impact: Claim Your Better Giving Account Today",
  });

export default function Component() {
  return (
    <main className="w-full grid content-start @container">
      <div className="xl:container xl:mx-auto px-5 pt-6 pb-2">
        <DappLogo classes="w-48 h-12" />
      </div>
      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Top className="xl:container xl:mx-auto px-5 px-10 bg-transparent" />
      </div>
      <div className="bg-gradient-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <Brands className="my-20 md:my-44" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50  via-transparent via-50% to-transparent">
        <WhyBG className="mt-10 xl:container xl:mx-auto px-5" />
      </div>
      <div className="bg-gradient-to-br from-transparent via-transparent via-50% to-lilac/50">
        <DonationFormInfo className="mt-60 xl:container xl:mx-auto px-5" />
      </div>
      <div className="pt-56 bg-gradient-to-bl from-lilac/50  via-50% via-transparent to-transparent">
        <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10 xl:container xl:mx-auto px-5" />
      </div>
      <Footer classes="mt-20" />
    </main>
  );
}
