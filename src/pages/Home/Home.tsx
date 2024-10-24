// import HeroBottom from "../@sections/HeroBottom";
import Animation from "./Animation";
import Benefits from "./Benefits";
import Blogs from "./Blogs";
import { BottomCta } from "./BottomCta";
import Brands from "./Brands";
import { Feature1 } from "./Feature1";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
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
      <Testimonials />
      <Blogs />
      <BottomCta className="mb-20 max-w-5xl sm:max-w-6xl justify-self-center mx-4 [28rem]:mx-10" />
    </>
  );
};
