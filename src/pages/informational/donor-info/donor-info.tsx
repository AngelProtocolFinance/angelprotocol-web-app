import { benefits } from "content/benefits";
import { metas } from "helpers/seo";
import type { MetaFunction } from "react-router";
import Benefits from "../../@sections/benefits";
import BottomCta from "./bottom-cta";
import DonationFormInfo from "./donation-form-info";
import Hero from "./hero";

export const meta: MetaFunction = () =>
  metas({
    title: "For Donors",
    description:
      "Easily support grassroots organizations all over the world with card, crypto, stock, and DAF gifts that keep on giving. As a nonprofit, we charge no platform fees.",
  });
export default function DonorInfo({ className = "" }) {
  return (
    <main className={`${className} grid @container`}>
      <Hero className="xl:container xl:mx-auto px-10" />
      <DonationFormInfo className="mt-20 xl:container xl:mx-auto px-5" />
      <Benefits
        className="mt-56 xl:container xl:mx-auto px-10"
        subheading="Simple path to financial stability"
        heading="Making a Lasting Impact: Give today, Give Forever"
        body="Access our free fundraising technology and tools."
        items={benefits.sf}
      />
      <BottomCta className="mt-40 mb-20 max-w-5xl @5xl:max-w-6xl justify-self-center mx-4 @md:mx-10" />
    </main>
  );
}
