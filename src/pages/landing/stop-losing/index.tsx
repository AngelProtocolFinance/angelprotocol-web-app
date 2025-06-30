import Hero from "./hero";
import { Section1 } from "./section1";
import { Section2 } from "./section2";
import { Section3 } from "./section3";
import { Section5 } from "./section5";
import { Testimonials } from "./testimonials";

export default function Page() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <Hero className="xl:container xl:mx-auto px-10" />
      <Section1 classes="xl:container xl:mx-auto px-10" />
      <Section2 classes="xl:container xl:mx-auto px-10" />
      <Section3 classes="xl:container xl:mx-auto px-10" />
      <Testimonials classes="xl:container xl:mx-auto px-10" />
      <Section5 classes="xl:container xl:mx-auto px-10" />
    </main>
  );
}
