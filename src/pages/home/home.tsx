// import HeroBottom from "../@sections/HeroBottom";
import { Footer } from "components/footer";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types/home";
// import { Animation } from "./animation";
// import Benefits from "./benefits";
import { Blogs } from "./blogs";
import { BottomCta } from "./bottom-cta";
import { Brands } from "./brands";
import { Ctas } from "./ctas";
import { Feature1 } from "./feature1";
import { Header } from "./header";
import Hero from "./hero";
import { Stats } from "./stats";
import Testimonials from "./testimonials";
// import { Video } from "./video";
export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export default CacheRoute(Home);

function Home({ loaderData: page1 }: Route.ComponentProps) {
  return (
    <div className="grid pb-4">
      <Header page1={page1} classes="sticky z-40 top-[-1px] mt-8 px-4" />
      <Hero classes="-mt-24" />
      <Brands classes="xl:container xl:mx-auto px-5" />
      <Stats classes="xl:container xl:mx-auto px-5 mt-16" />
      {/* <HeroBottom className="mb-10" endowments={page1.items} /> */}

      <Feature1 classes="xl:container xl:mx-auto px-5 mt-36" />
      <Ctas classes="xl:container xl:mx-auto px-5 mt-36" />
      {/* <Benefits /> */}
      {/* <Animation /> */}

      {/* <Video /> */}
      <Testimonials />
      <Blogs />
      <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
      <Footer />
    </div>
  );
}
