import Banner from "./Banner";
import Info from "./Info";
import Specs from "./Specs";
import Access from "./Access";
import Portal from "pages/Home/Portal";

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
