import Animation from "./Animation";
import Benefits from "./Benefits";
import Blogs from "./Blogs";
import Brands from "./Brands";
import Hero from "./Hero";
import HeroBottom from "./HeroBottom";
import Testimonials from "./Testimonials";
import Video from "./Video";
const Home = () => {
  return (
    <>
      <Hero classes="-mt-24" />
      <HeroBottom />
      <Benefits />
      <Brands />
      <Animation />
      <Video />
      <Testimonials />
      <Blogs />
    </>
  );
};

export default Home;
