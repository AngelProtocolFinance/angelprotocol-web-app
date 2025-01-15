import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";
import { benefits } from "content/benefits";
import { metas } from "helpers/seo";
import type { EndowmentCard } from "types/aws";
import Benefits from "../../@sections/Benefits";
import HeroBottom from "../../@sections/HeroBottom";
import BottomCta from "./BottomCta";
import DonationFormInfo from "./DonationFormInfo";
import Hero from "./Hero";

export const meta: MetaFunction = () =>
  metas({
    title: "For Donors",
    description:
      "Easily support grassroots organizations all over the world with card, crypto, stock, and DAF gifts that keep on giving. As a nonprofit, we charge no platform fees.",
  });
export default function DonorInfo({ className = "" }) {
  const endows = useLoaderData() as EndowmentCard[];
  return (
    <main className={`${className} grid @container`}>
      <Hero className="padded-container px-10" />
      <HeroBottom className="mb-10 mt-20" endowments={endows} />
      <DonationFormInfo className="mt-20 padded-container" />
      <Benefits
        className="mt-56 padded-container px-10"
        subheading="Simple path to financial stability"
        heading="Making a Lasting Impact: Give today, Give Forever"
        body="Access our free fundraising technology and tools."
        items={benefits.sf}
      />
      <BottomCta className="mt-40 mb-20 max-w-5xl @5xl:max-w-6xl justify-self-center mx-4 @md:mx-10" />
    </main>
  );
}
