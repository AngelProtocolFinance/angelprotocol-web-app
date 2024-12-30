// import HeroBottom from "../@sections/HeroBottom";
import Footer from "components/Footer";
import Animation from "./Animation";
import Benefits from "./Benefits";
import Blogs from "./Blogs";
import { BottomCta } from "./BottomCta";
import Brands from "./Brands";
import { Feature1 } from "./Feature1";
import Header from "./Header";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
// import Video from "./Video";
// import type { EndowPage } from "./types";
// import { useLoaderData } from "react-router";
export const Component = () => {
  // const page1 = useLoaderData() as EndowPage;
  return (
    <div className="grid">
      <Header classes="sticky z-40 top-[-1px] mt-8 px-4" />
      <Hero classes="-mt-24" />
      {/* <HeroBottom className="mb-10" endowments={page1.Items} /> */}
      <Benefits />
      <Brands />
      <Feature1 />
      <Animation />
      {/* <Video /> */}
      <Testimonials />
      <Blogs />
      <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
      <Footer />
    </div>
  );
};
