import bg_logo from "assets/images/bg-logo.webp?url";
// import HeroBottom from "../@sections/HeroBottom";
import { Footer } from "components/footer";
import { metas } from "helpers/seo";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types/home";
import { Partners } from "./1-partners";
import { Stats } from "./2-stats";
import { Steps } from "./3-steps";
import { Ctas } from "./4-ctas";
import { Manifesto } from "./5-manifesto";
import { Section6 } from "./6-section";
import { Section7 } from "./7-section";
import { Section8 } from "./8-section";
import { Features } from "./9-features";
import { FAQ } from "./11-faq";
// import { Animation } from "./animation";
// import Benefits from "./benefits";
import { Blogs } from "./blogs";
import { BottomCta } from "./bottom-cta";
import { Header } from "./header";
import Hero from "./hero";
import { Testimonials } from "./testimonials";
// import { Video } from "./video";
export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export const meta: Route.MetaFunction = () =>
  metas({
    title: "Fundraising Platform for Nonprofits | Better Giving",
    description:
      "Raise more this quarter and grow funds together. Better Giving offers free, high-converting donation forms, savings, and fund growth tools—no platform or management fees.",
    image: bg_logo,
  });

export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  return (
    <div className="grid pb-4">
      <Header page1={page1} classes="sticky z-40 top-[-1px] mt-8 px-4" />
      <Hero classes="-mt-24" />
      <Partners classes="xl:container xl:mx-auto px-5" />
      <Stats classes="xl:container xl:mx-auto px-5 mt-16" />
      {/* <HeroBottom className="mb-10" endowments={page1.items} /> */}

      <Steps classes="xl:container xl:mx-auto px-5 mt-36" />
      <Ctas classes="xl:container xl:mx-auto mt-36" />
      {/* <Benefits /> */}
      {/* <Animation /> */}
      <Manifesto classes="mt-56 xl:container xl:mx-auto px-5" />
      <Section6 classes="xl:container xl:mx-auto px-5" />
      <Section7 classes="xl:container xl:mx-auto px-5" />

      <Section8 classes="xl:container xl:mx-auto px-5" />
      <div className="bg-gradient-to-br from-transparent to-lilac/40">
        <Features classes="xl:container xl:mx-auto px-5" />
      </div>
      {/* <Video /> */}
      <div className="bg-gradient-to-bl from-lilac/40 to-peach/10">
        <Testimonials classes="xl:container xl:mx-auto px-5" />
      </div>
      <div className="bg-gradient-to-br from-peach/10 from-80% to-transparent">
        <Blogs />
      </div>
      <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
      <FAQ classes="xl:container xl:mx-auto px-5" />
      <Footer />
    </div>
  );
}
