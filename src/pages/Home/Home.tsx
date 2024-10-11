import Footer from "components/Footer";
import HeroBottom from "../@sections/HeroBottom";
import Animation from "./Animation";
import Benefits from "./Benefits";
import Blogs from "./Blogs";
import Brands from "./Brands";
import Header from "./Header";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Video from "./Video";
export const Component = () => {
  return (
    <>
      <Header classes="sticky z-40 top-[-1px] mt-8 px-4" />
      <Hero classes="-mt-24" />
      <HeroBottom className="mb-10" />
      <Benefits />
      <Brands />
      <Animation />
      <Video />
      <Testimonials />
      <Blogs />
      <Footer />
    </>
  );
};
