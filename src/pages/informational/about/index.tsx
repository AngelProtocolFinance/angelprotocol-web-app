import type { MetaFunction } from "@vercel/remix";
import { metas } from "helpers/seo";
import { BottomCta } from "./bottom-cta";
import { Hero } from "./hero";
import { Manifesto } from "./manifesto";
import { Quote } from "./quote";
import { Section2 } from "./section-2";
import { Team } from "./team";

export const meta: MetaFunction = () => metas({ title: "About us" });
export default function About() {
  return (
    <main className="w-full grid content-start pb-40 @container">
      <div className="bg-linear-to-br from-50% from-transparent to-peach/50">
        <Hero classes="xl:container xl:mx-auto px-5" />
      </div>
      <div className="bg-linear-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <Section2 className="mt-28 xl:container xl:mx-auto px-5" />
      </div>
      <div className="bg-linear-to-br from-lilac/50 via-transparent via-50% to-lilac/50">
        <Manifesto className="mt-56 xl:container xl:mx-auto px-5" />
      </div>

      <div className="bg-linear-to-bl via-transparent via-50% from-lilac/50 to-transparent">
        <Quote className="xl:container xl:mx-auto px-5" />
      </div>
      <div className="bg-linear-to-bl from-50% from-transparent to-peach/50">
        <Team classes="xl:container xl:mx-auto px-5 mt-20 sm:mt-56" />
      </div>

      <div className="bg-linear-to-br via-transparent via-50% from-peach/50 to-transparent">
        <BottomCta className="mt-20 sm:mt-56 xl:container xl:mx-auto px-5 mx-10" />
      </div>
    </main>
  );
}
