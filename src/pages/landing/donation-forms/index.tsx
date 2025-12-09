import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import type { MetaFunction } from "react-router";
import { FAQ, faqs } from "../../@sections/faq";
import { Partners } from "../../@sections/partners";
import { Steps } from "../../@sections/steps";
import { BottomCta } from "./bottom-cta";
import { Ctas } from "./ctas";
import { DonationFormInfo } from "./donation-form-info";
import { Members } from "./members";

export const meta: MetaFunction = () =>
  metas({
    title: `All-In-One Donation Form | ${APP_NAME}`,
    description:
      "Raise more. Save more. Do Less. 100% free. No Setup costs, no recurring charges, no platform fee.",
  });

export default function Page() {
  return (
    <>
      <DonationFormInfo classes="xl:container xl:mx-auto" />
      <Partners classes="xl:container xl:mx-auto px-5 mt-16" />
      <Ctas classes="xl:container xl:mx-auto px-5" />
      <Steps classes="xl:container xl:mx-auto px-5" />
      <Members classes="xl:container xl:mx-auto px-5" />
      <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
      <FAQ
        classes="xl:container xl:mx-auto px-5 mt-24"
        items={[faqs[1], faqs[2], faqs[3], faqs[4]]}
      />
    </>
  );
}
