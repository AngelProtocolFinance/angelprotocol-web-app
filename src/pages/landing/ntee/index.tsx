import Hero from "./hero";
import { Section1 } from "./section1";
import { Section2 } from "./section2";
import { Section3 } from "./section3";
import { Section5 } from "./section5";
import { Section6 } from "./section6";
import { Section7 } from "./section7";
import { Testimonials } from "./testimonials";

const page_context = {
  "arts-culture": {},
  education: {},
  environment: {},
  "animal-rescue": {},
  healthcare: {},
  "mental-health": {},
  "disease-awareness": {},
  "medical-research": {},
  "legal-justice": {},
  "job-training": {},
  "food-nutrition": {},
  "housing-shelter": {},
  "public-safety": {},
  "recreation-sports": {},
  "youth-development": {},
  "human-services": {},
  "international-aid": {},
  "civil-rights": {},
  "community-improvement": {},
  "philanthropy-volunteering": {},
  "science-technology": {},
  "social-science": {},
  "public-benefit": {},
  "religious-organizations": {},
  "membership-organizations": {},
};

export default function Page() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <Hero className="xl:container xl:mx-auto px-10" />
      <Section1 classes="xl:container xl:mx-auto px-10" />
      <Section2 classes="xl:container xl:mx-auto px-10 mt-48" />
      <Section3 classes="xl:container xl:mx-auto px-10 mt-48" />
      <Testimonials classes="xl:container xl:mx-auto px-10" />
      <Section5 classes="xl:container xl:mx-auto px-10 mt-24" />
      <Section6 classes="xl:container xl:mx-auto px-10 mt-24" />
      <div className="bg-gradient-to-tr from-blue to-blue-l1">
        <Section7 classes="xl:container xl:mx-auto px-10" />
      </div>
    </main>
  );
}
