import { Navigate, Route, Routes } from "react-router-dom";
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
        <Route path={routes[3]} element={<Whitelists step={3} />} />
        <Route path={routes[4]} element={<Maturity step={4} />} />
        <Route path={routes[5]} element={<Splits step={5} />} />
        <Route path={routes[6]} element={<Fees step={6} />} />
        <Route index element={<About step={1} />} />
        <Route path="*" element={<Navigate to="." />} />
      </Route>
    </Routes>
  );
}
