import Animation from "./Animation";
import Path from "./Benefits";
import Blogs from "./Blogs";
import Brands from "./Brands";
import Hero from "./Hero";
import HeroBottom from "./HeroBottom";
import Testimonials from "./Testimonials";
import Video from "./Video";
const Home = () => {
  return (
    <div>
      <div>
        <Hero />
        <HeroBottom />
        <Path />
        <Brands />
        <Animation />
        <Video />
        <Testimonials />
        <Blogs />
      </div>
    </div>
  );
};

export default Home;
