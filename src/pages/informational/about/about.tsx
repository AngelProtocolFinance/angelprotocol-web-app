import Seo from "components/Seo";
import { BottomCta } from "./bottom-cta";
import { Hero } from "./hero";
import { Manifesto } from "./manifesto";
import { Quote } from "./quote";
import { Section2 } from "./section-2";
import { Team } from "./team";

export function About() {
  return (
    <main className="w-full grid content-start pb-40 @container">
      <Seo title="About Us" />
      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Hero classes="padded-container" />
      </div>
      <div className="bg-gradient-to-bl via-transparent via-50% from-peach/50 to-lilac/50">
        <Section2 className="mt-28 padded-container" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50 via-transparent via-50% to-lilac/50">
        <Manifesto className="mt-56 padded-container" />
      </div>

      <div className="bg-gradient-to-bl via-transparent via-50% from-lilac/50 to-transparent">
        <Quote className="padded-container" />
      </div>
      <div className="bg-gradient-to-bl from-50% from-transparent to-peach/50">
        <Team classes="padded-container mt-20 sm:mt-56" />
      </div>

      <div className="bg-gradient-to-br via-transparent via-50% from-peach/50 to-transparent">
        <BottomCta className="mt-20 sm:mt-56 padded-container mx-10" />
      </div>
    </main>
  );
}
