import { Link } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";
import { Footer } from "components/footer";
import { DappLogo } from "components/image";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import { Top } from "./top";
export const meta: MetaFunction = () =>
  metas({
    title: "Access the Better Giving Donation Calculator",
    description:
      "Ready to reduce fees and grow your nonprofit’s impact? Access Better Giving’s Donation Calculator to see how smarter processing and crypto donations can help you raise more — starting now.",
  });
export default function Component() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <div
        className="sticky top-[-1px] z-50 bg-white"
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

      <Top classes="xl:container xl:mx-auto px-10 bg-transparent mt-16 mb-28" />

      <Footer classes="xl:container xl:mx-auto px-10" />
    </main>
  );
}
