import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import type { MetaFunction } from "react-router";
import { Partners } from "../../@sections/partners";
import { Products } from "../../@sections/products";
import { Steps } from "../../@sections/steps";
import { BottomCta } from "./bottom-cta";
import { Features } from "./features";
import { Hero } from "./hero";
import { Hero2 } from "./hero-2";

export const meta: MetaFunction = () =>
  metas({
    title: `Giving Tuesday | ${APP_NAME}`,
    description: `Why stop at one day of generosity? ${APP_NAME} helps nonprofits grow donations sustainably with low fees, year-round yields, and every payment method in one place.`,
  });

export default function Page() {
  return (
    <>
      <Hero className="xl:container xl:mx-auto px-5" />
      <Partners classes="xl:container xl:mx-auto px-5" />
      <Hero2 className="xl:container xl:mx-auto px-5" />
      <Features classes="xl:container xl:mx-auto px-5" />
      {/* <Ctas classes="xl:container xl:mx-auto px-5" /> */}
      <Steps classes="xl:container xl:mx-auto px-5 my-24" />
      {/* <Testimonials classes="xl:container xl:mx-auto px-5 mt-24 py-24" /> */}
      <Products classes="xl:container xl:mx-auto px-5 mt-12" />
      <BottomCta className="my-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
    </>
  );
}
