import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Templates from "./Templates";
import Withdraws from "./Withdraws";
import { routes } from "./routes";

export default function Views() {
  return (
    <Routes>
      <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
      <Route path={adminRoutes.proposals} element={<Proposals />} />
      <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
      <Route path={routes.withdraws} element={<Withdraws />} />
      <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
      <Route index element={<Dashboard />} />
    </Routes>
  );
}
