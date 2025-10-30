import { DappLogo } from "components/image";
import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import { Partners } from "../../@sections/partners";
import { Products } from "../../@sections/products";
import { Steps } from "../../@sections/steps";
import { Testimonials } from "../../@sections/testimonials";
import { Underdog } from "../../@sections/underdog";
import type { Route } from "./+types";
import { animal_rescue } from "./contexts/animal-rescue";
import { arts_culture } from "./contexts/arts-culture";
import { civil_rights } from "./contexts/civil-rights";
import { community_improvement } from "./contexts/community-improvement";
import { disease_awareness } from "./contexts/disease-awareness";
import { education } from "./contexts/education";
import { environment } from "./contexts/environment";
import { health_care } from "./contexts/health-care";
import { housing_shelter } from "./contexts/housing-shelter";
import { human_services } from "./contexts/human-services";
import { mental_health } from "./contexts/mental-health";
import { public_safety } from "./contexts/public-safety";
import { religious_organizations } from "./contexts/religious-organizations";
import { Cta } from "./cta";
import { Faq } from "./faq";
import { Features } from "./features";
import { Footer } from "./footer";
import { Hero } from "./hero";
import type { PageContext } from "./types";

const page_context: Record<string, PageContext> = {
  "arts-culture": arts_culture,
  education: education,
  environment: environment,
  "animal-rescue": animal_rescue,
  healthcare: health_care,
  "mental-health": mental_health,
  "civil-rights": civil_rights,
  "public-safety": public_safety,
  "disease-awareness": disease_awareness,
  // "disease-awareness": {},
  // "medical-research": {},
  // "legal-justice": {},
  // "job-training": {},
  // "food-nutrition": {},
  "housing-shelter": housing_shelter,
  // "public-safety": {},
  // "recreation-sports": {},
  // "youth-development": {},
  "human-services": human_services,
  // "international-aid": {},
  // "civil-rights": {},
  "community-improvement": community_improvement,
  // "philanthropy-volunteering": {},
  // "science-technology": {},
  // "social-science": {},
  // "public-benefit": {},
  "religious-organizations": religious_organizations,
  // "membership-organizations": {},
};

export const meta: Route.MetaFunction = ({ params: { slug = "" } }) => {
  const ctx = page_context[slug];
  return metas({
    title: `Fundraising Platform for ${ctx.meta_subject.title} | ${APP_NAME}`,
    description: `${APP_NAME} helps ${ctx.meta_subject.description} increase giving and build long-term growth. Free donation processing with no platform or fund-management fees.`,
    image: ctx.hero,
  });
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const ctx = page_context[params.slug];
  if (!ctx) throw new Response("Not Found", { status: 404 });
  return ctx;
};

export default function Page({ loaderData: ctx }: Route.ComponentProps) {
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
      <Partners
        of_what={ctx.partners}
        classes="xl:container xl:mx-auto px-10 my-10 xl:my-20"
      />
      <Steps classes="xl:container xl:mx-auto px-10 my-10 xl:my-20" />
      <Products classes="xl:container xl:mx-auto px-10 my-10 xl:my-20" />
      <Features classes="xl:container xl:mx-auto px-10 my-10 xl:my-20" />
      <Underdog classes="xl:container xl:mx-auto px-10 my-10 xl:my-20" />
      <Testimonials classes="xl:container xl:mx-auto px-10 my-10 xl:my-20" />
      <div className="bg-gray-l5 pb-24">
        <Faq classes="xl:container xl:mx-auto px-10 mt-24" />
      </div>
      <div className="xl:container mx-auto max-sm:px-10 px-24 my-10 xl:my-20">
        <Cta {...ctx} />
      </div>
      <Footer />
    </main>
  );
}
