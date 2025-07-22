import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { DappLogo } from "components/image";
import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import { animal_rescue } from "./contexts/animal-rescue";
import { arts_culture } from "./contexts/arts-culture";
import { civil_rights } from "./contexts/civil-rights";
import { education } from "./contexts/education";
import { environment } from "./contexts/environment";
import { health_care } from "./contexts/health-care";
import { mental_health } from "./contexts/mental-health";
import { DonationFormInfo } from "./donation-form-info";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { Section1 } from "./section1";
import { Section2 } from "./section2";
import { Section5 } from "./section5";
import { Section6 } from "./section6";
import { Section7 } from "./section7";
import { Testimonials } from "./testimonials";
import type { PageContext } from "./types";

const page_context: Record<string, PageContext> = {
  "arts-culture": arts_culture,
  education: education,
  environment: environment,
  "animal-rescue": animal_rescue,
  healthcare: health_care,
  "mental-health": mental_health,
  "civil-rights": civil_rights,
  // "disease-awareness": {},
  // "medical-research": {},
  // "legal-justice": {},
  // "job-training": {},
  // "food-nutrition": {},
  // "housing-shelter": {},
  // "public-safety": {},
  // "recreation-sports": {},
  // "youth-development": {},
  // "human-services": {},
  // "international-aid": {},
  // "civil-rights": {},
  // "community-improvement": {},
  // "philanthropy-volunteering": {},
  // "science-technology": {},
  // "social-science": {},
  // "public-benefit": {},
  // "religious-organizations": {},
  // "membership-organizations": {},
};

export const meta: MetaFunction = ({ params: { slug = "" } }) => {
  const ctx = page_context[slug];
  return metas({
    title: `${ctx.meta_title} | ${APP_NAME}`,
    description: `${APP_NAME} ${ctx.meta_description}`,
    image: ctx.hero,
  });
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug = "" } = params;
  const ctx = page_context[slug];
  if (!ctx) {
    throw new Response("Not Found", { status: 404 });
  }
  return ctx;
};

export default function Page() {
  const ctx = useLoaderData<PageContext>();
  return (
    <main className="w-full grid content-start @container">
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
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 xl:container xl:mx-auto px-5 py-2">
          <DappLogo classes="h-12" />
        </div>
      </div>
      <Hero className="xl:container xl:mx-auto px-10" {...ctx} />
      <Section1
        classes="xl:container xl:mx-auto px-10 py-20 rounded-lg"
        {...ctx}
      />

      <div className="mt-48 bg-gray-l5">
        <Section2 classes="xl:container xl:mx-auto p-16" copy={ctx.red_copy} />
      </div>

      <DonationFormInfo className="mt-28 xl:container xl:mx-auto px-5" />
      {/* <Section3 classes="xl:container xl:mx-auto px-10 mt-48" /> */}
      <div className="bg-gray-l5 mt-28">
        <Testimonials classes="xl:container xl:mx-auto px-10" />
      </div>
      <Section5 classes="xl:container xl:mx-auto px-10 mt-24" />
      <div className="bg-gray-l5">
        <Section6 classes="xl:container xl:mx-auto px-10 mt-24" />
      </div>
      <div className="bg-gradient-to-tr from-blue to-blue-l1">
        <Section7 classes="xl:container xl:mx-auto px-10" />
      </div>
      <Footer />
    </main>
  );
}
