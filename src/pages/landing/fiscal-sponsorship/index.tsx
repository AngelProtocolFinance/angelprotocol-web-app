import { Footer } from "components/footer";
import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import type { MetaFunction } from "react-router";
import { FAQ, faqs } from "../../@sections/faq";
import { Partners } from "../../@sections/partners";
import { Steps } from "../../@sections/steps";
import { Testimonials } from "../../@sections/testimonials";
import { BottomCta } from "./bottom-cta";
import { Ctas } from "./ctas";
import { Hero } from "./hero";

export const meta: MetaFunction = () =>
  metas({
    title: `Fiscal Sponsorship | ${APP_NAME}`,
    description: `Access U.S. grants and grow globally with ${APP_NAME}.`,
  });

export default function Page() {
  return (
    <>
      <Hero classes="xl:container xl:mx-auto" />
      <Partners classes="xl:container xl:mx-auto px-5 max-sm:-mt-10 mt-10" />
      <Ctas classes="xl:container xl:mx-auto px-5" />
      <Steps classes="xl:container xl:mx-auto px-5 mt-24" />
      <Testimonials classes="xl:container xl:mx-auto px-5 mt-24" />
      <BottomCta className="my-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
      <FAQ
        classes="xl:container xl:mx-auto px-5 mt-24"
        items={[faqs[10], faqs[9], faqs[11], faqs[4], faqs[10]]}
      />
    </>
  );
}
