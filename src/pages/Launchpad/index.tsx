import { Route, Routes } from "react-router-dom";
import About from "./About";
import Layout from "./Layout";
import Management from "./Management";

//Launchpad component
export default function Launchpad() {
  return (
    <Routes>
      <Route element={<Layout classes="my-0 md:my-20 justify-self-center" />}>
        <Route path="management" element={<Management />} />
        <Route path="whitelists" element={<h1>Step 3</h1>} />
        <Route path="step4" element={<h1>Step 4</h1>} />

        <Route index element={<About />} />
      </Route>
    </Routes>
  );
}
