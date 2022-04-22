import { Route, Routes } from "react-router-dom";
import { charityRoutes } from "types/routes";
import { EndowmentInfo } from "./EndowmentInfo";
import Overview from "./Overview";

export default function CharityTabs() {
  //no need to lazy load this small sub pages
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path={charityRoutes.endowment} element={<EndowmentInfo />} />
      <Route path="*" element={<Overview />} />
    </Routes>
  );
}
