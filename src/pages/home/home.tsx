// import HeroBottom from "../@sections/HeroBottom";
import { Footer } from "components/footer";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { FAQ, faqs } from "../@sections/faq";
import { Partners } from "../@sections/partners";
import { Products } from "../@sections/products";
import { Steps } from "../@sections/steps";
import { Testimonials } from "../@sections/testimonials";
import { Underdog } from "../@sections/underdog";
import type { Route } from "./+types/home";
// import { Animation } from "./animation";
// import Benefits from "./benefits";
import { Blogs } from "./blogs";
import { BottomCta } from "./bottom-cta";
import { Ctas } from "./ctas";
import { Features } from "./features";
import { Header } from "./header";
import { Hero } from "./hero";
import { Manifesto } from "./manifesto";
// import { Video } from "./video";
export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default CacheRoute(Page);
function Page({ loaderData: page1 }: Route.ComponentProps) {
  return (
    <div className="grid pb-4">
      <Header page1={page1} classes="sticky z-40 top-[-1px]" />
      <Hero classes="" />
      <Partners classes="xl:container xl:mx-auto px-5 mt-12" />

      <Steps classes="xl:container xl:mx-auto px-5 mt-36" />
      <Ctas classes="xl:container xl:mx-auto mt-36" />
      {/* <Benefits /> */}
      {/* <Animation /> */}
      <Manifesto classes="my-32 px-5" />
      <Products classes="xl:container xl:mx-auto px-5" />

      <Underdog classes="xl:container xl:mx-auto px-5 pb-20 pt-10" />
      <div className="bg-gradient-to-br from-transparent to-lilac/40">
        <Features classes="xl:container xl:mx-auto px-5" />
      </div>
      {/* <Video /> */}
      <div className="bg-gradient-to-bl from-lilac/40 to-peach/10">
        <Testimonials classes="xl:container xl:mx-auto px-5 py-24" />
      </div>
      <div className="bg-gradient-to-br from-peach/10 from-80% to-transparent">
        <Blogs />
      </div>
      <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
      <FAQ items={faqs.slice(0, 5)} classes="xl:container xl:mx-auto px-5" />
      <Footer />
    </div>
  );
}
