import { Route, Routes } from "react-router-dom";
import About from "./About";
import Fees from "./Fees";
import Layout from "./Layout";
import Management from "./Management";
import Maturity from "./Maturity";
import Splits from "./Splits";
import Whitelists from "./Whitelists";

//Launchpad component
export default function Launchpad() {
  return (
    <Routes>
      <Route element={<Layout classes="my-0 md:my-20 justify-self-center" />}>
        <Route path="management" element={<Management />} />
        <Route path="whitelists" element={<Whitelists />} />
        <Route path="maturity" element={<Maturity />} />
        <Route path="splits" element={<Splits />} />
        <Route path="fees" element={<Fees />} />

        <Route index element={<About />} />
      </Route>
    </Routes>
  );
}
