import Banner from "./Banner";
import Highlights from "./Highlights";
import Info from "./Info";
import Portal from "./Portal";
import Process from "./Process";
import Specs from "./Specs";
import Sponsors from "./Sponsors";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <div className="pt-24">
      <Banner />
      <Info />
      <Highlights />
      <Specs />
      <Process />
      <Testimonials />
      <Portal />
      <Sponsors />
    </div>
  );
}
