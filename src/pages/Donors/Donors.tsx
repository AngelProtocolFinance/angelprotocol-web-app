import Accepted from "./Accepted";
import Alignment from "./Alignment";
import Banner from "./Banner";
import Impact from "./Impact";
import Ways from "./Ways";

export default function Donors() {
  return (
    <div className="pt-24">
      <Banner />
      <Impact />
      <Alignment />
      <Ways />
      <Accepted />
    </div>
  );
}
