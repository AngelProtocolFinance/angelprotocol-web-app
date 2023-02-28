import { Route, Routes } from "react-router-dom";
import About from "./About";
import Fees from "./Fees";
import Layout from "./Layout";
import Management from "./Management";
import Maturity from "./Maturity";
import Splits from "./Splits";
import Whitelists from "./Whitelists";
import { routes } from "./constants";

//Launchpad component
export default function Launchpad() {
  return (
    <Routes>
      <Route element={<Layout classes="my-0 md:my-20 justify-self-center" />}>
        <Route path={routes[2]} element={<Management step={2} />} />
        <Route path={routes[3]} element={<Whitelists />} />
        <Route path={routes[4]} element={<Maturity />} />
        <Route path={routes[5]} element={<Splits />} />
        <Route path={routes[6]} element={<Fees />} />
        <Route index element={<About step={1} />} />
      </Route>
    </Routes>
  );
}
