import { Navigate, Route, Routes } from "react-router-dom";
import { charityRoutes } from "types/routes";
import { EndowmentInfo } from "./EndowmentInfo";
import Overview from "./Overview";

export default function CharityTabs() {
  //no need to lazy load this small sub pages
  return (
    <Routes>
      <Route path={charityRoutes.overview} element={<Overview />} />
      <Route path={charityRoutes.endowment} element={<EndowmentInfo />} />
      <Route path="*" element={<Navigate to={charityRoutes.overview} />} />
    </Routes>
  );
}
