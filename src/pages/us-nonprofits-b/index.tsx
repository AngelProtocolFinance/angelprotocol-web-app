import { Link } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";
import { DappLogo } from "components/image";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import { BottomCta } from "./bottom-cta";
import { Brands } from "./brands";
import { DonationFormInfo } from "./donation-form-info";
import { Feature } from "./feature";
import { Footer } from "./footer";
import Testimonials from "./testimonials";
import { Top } from "./top";

export const meta: MetaFunction = () =>
  metas({
    title: "US Nonprofits",
    description:
      "Simplify Fundraising, Maximize Impact: Claim Your Better Giving Account Today",
  });
export default function Component() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <div
        className="sticky top-[-1px] z-50"
        ref={(node) => {
          if (!node) return;
          const observer = new IntersectionObserver(
            ([e]) => {
              const isIntersecting = e.intersectionRatio < 1;
              e.target.classList.toggle("bg-white", isIntersecting);
              e.target.classList.toggle("shadow-lg", isIntersecting);
            },
            { threshold: [1] }
          );
          observer.observe(node);
        }}
      >
        <div className="xl:container xl:mx-auto px-5 py-4 flex justify-between items-center">
          <DappLogo classes="w-48 h-12" />
          <Link
            to={appRoutes.signup}
            className="btn text-base normal-case max-sm:hidden bg-blue-d1 hover:bg-blue text-white text-nowrap px-6 py-2 rounded-full"
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Top className="xl:container xl:mx-auto px-5 px-10 bg-transparent" />
      </div>
      <div className="bg-gradient-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <Brands className="my-20" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50 via-transparent via-50% to-transparent">
        <Feature className="xl:container xl:mx-auto px-5" />
      </div>
      <div className="bg-gradient-to-br from-transparent via-transparent via-50% to-lilac/50">
        <DonationFormInfo className="mt-60 xl:container xl:mx-auto px-5" />
      </div>
      <div className="bg-gradient-to-bl from-lilac/50  via-50% via-transparent to-transparent">
        <Testimonials />
      </div>
      <div className="mt-48">
        <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10 xl:container xl:mx-auto px-5" />
      </div>
      <Footer />
    </main>
  );
}
