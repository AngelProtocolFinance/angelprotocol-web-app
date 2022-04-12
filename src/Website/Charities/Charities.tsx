import Portal from "Website/Home/Portal";
import Access from "./Access";
import Banner from "./Banner";
import Info from "./Info";
import Specs from "./Specs";

export default function Charities() {
  return (
    <div className="pt-24">
      <Banner />
      <Specs />
      <Info />
      <Access />
      <Portal />
    </div>
  );
}
