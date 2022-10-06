import { Navigate, Route, Routes } from "react-router-dom";
import { profileRoutes } from "constants/routes";
import Endowment from "./Endowment";
import Overview from "./Overview";

export default function Tabs() {
  //no need to lazy load this small sub pages
  return (
    <Routes>
      <Route path={profileRoutes.overview} element={<Overview />} />
      <Route path={profileRoutes.endowment} element={<Endowment />} />
      <Route
        path="*"
        element={<Navigate replace to={profileRoutes.overview} />}
      />
    </Routes>
  );
}
