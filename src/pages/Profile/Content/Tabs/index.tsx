import { Navigate, Route, Routes } from "react-router-dom";
import { charityRoutes } from "constants/routes";
import Endowment from "./Endowment";
import Overview from "./Overview";

export default function CharityTabs() {
  //no need to lazy load this small sub pages
  return (
    <Routes>
      <Route path={charityRoutes.overview} element={<Overview />} />
      <Route path={charityRoutes.endowment} element={<Endowment />} />
      <Route
        path="*"
        element={<Navigate replace to={charityRoutes.overview} />}
      />
    </Routes>
  );
}
