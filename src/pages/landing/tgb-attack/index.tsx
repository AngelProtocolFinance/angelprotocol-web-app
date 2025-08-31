import { Footer } from "components/footer";
import { DappLogo } from "components/image";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { BottomCta } from "./bottom-cta";
import { Brands } from "./brands";
import { Feature } from "./feature";
import { ProbSol } from "./prob-sol";
import { Top } from "./top";
export const meta: MetaFunction = () =>
  metas({
    title: "The Smart Move to Make for Accepting Crypto Donations",
    description:
      "Better Giving ensures 100% of your donations go toward your mission—no hidden fees, no unnecessary costs, just seamless crypto, stock, and DAF giving.",
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
        <div className="xl:container xl:mx-auto px-10 py-4 flex justify-between gap-x-4 items-center">
          <DappLogo classes="h-12" />
          <Link
            to={appRoutes.signup}
            className="btn btn-blue max-xl:text-sm normal-case text-nowrap px-6 py-2 rounded-full"
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Top classes="-mt-24" />
      </div>
      <div className="bg-gradient-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <Brands className="my-20 xl:my-56" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50 via-transparent via-50% to-transparent">
        <Feature className="xl:container xl:mx-auto px-10" />
      </div>
      <div className="bg-gradient-to-br from-transparent via-transparent via-50% to-lilac/50">
        <ProbSol className="xl:container xl:mx-auto px-10 pt-40" />
      </div>
      <div className="bg-gradient-to-bl from-lilac/50 via-transparent to-transparent mb-40 px-10">
        <BottomCta className="max-w-2xl xl:max-w-4xl mx-auto" />
      </div>
      <Footer classes="xl:container xl:mx-auto px-10" />
    </main>
  );
}
