import HeroBottom from "../@sections/HeroBottom";
import Animation from "./Animation";
import Benefits from "./Benefits";
import Blogs from "./Blogs";
import Brands from "./Brands";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Video from "./Video";
export const Component = () => {
  return (
    <>
      <Hero classes="-mt-24" />
      <HeroBottom className="mb-10" />
      <Benefits />
      <Brands />
      <Animation />
      <Video />
      <Testimonials />
      <Blogs />
    </>
  );
};
