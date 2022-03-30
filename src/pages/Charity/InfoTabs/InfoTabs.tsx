import { Navigate, Route, Routes } from "react-router-dom";
import { charity } from "constants/routes";
import { EndowmentInfo } from "./EndowmentInfo";
import Overview from "./Overview";

export default function InfoTabs() {
  //no need to lazy load this small sub pages
  return (
    <Routes>
      <Route path={charity.overview} element={<Overview />} />
      <Route path={charity.endowment} element={<EndowmentInfo />} />
      <Route path="*" element={<Navigate to={charity.overview} />} />
    </Routes>
  );
}
