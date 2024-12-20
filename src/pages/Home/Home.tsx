// import HeroBottom from "../@sections/HeroBottom";
import { Horizontal } from "pages/@sections/testimonials";
import Animation from "./Animation";
import Benefits from "./Benefits";
import Blogs from "./Blogs";
import { BottomCta } from "./BottomCta";
import Brands from "./Brands";
import { Feature1 } from "./Feature1";
import Hero from "./Hero";
// import Video from "./Video";
export const Component = () => {
  return (
    <>
      <Hero classes="-mt-24" />
      {/* <HeroBottom className="mb-10" /> */}
      <Benefits />
      <Brands />
      <Feature1 />
      <Animation />
      {/* <Video /> */}
      <div className="@container">
        <Horizontal classes="pt-48 bg-gradient-to-b from-peach/20 to-transparent overflow-x-clip" />
      </div>
      {/* <Testimonials /> */}
      <Blogs />
      <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
    </>
  );
};
