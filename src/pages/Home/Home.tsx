import Footer from "components/Footer";
import { useLoaderData } from "react-router-dom";
import HeroBottom from "../@sections/HeroBottom";
import Animation from "./Animation";
import Benefits from "./Benefits";
import Blogs from "./Blogs";
import Brands from "./Brands";
import Header from "./Header";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Video from "./Video";
import type { EndowPage } from "./types";
export const Component = () => {
  const page1 = useLoaderData() as EndowPage;
  return (
    <>
      <Header classes="sticky z-40 top-[-1px] mt-8 px-4" />
      <Hero classes="-mt-24" />
      <HeroBottom className="mb-10" endowments={page1.Items} />
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
