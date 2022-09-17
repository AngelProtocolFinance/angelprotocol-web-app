import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Investments from "./Investments";
import Templates from "./Templates";
import Withdraws from "./Withdraws";

export default function Views() {
  return (
    <Routes>
      <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
      <Route path={adminRoutes.proposals} element={<Proposals />} />
      <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
      <Route path={adminRoutes.withdraws} element={<Withdraws />} />
      <Route path={adminRoutes.withdraws} element={<Investments />} />
      <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
      <Route index element={<Dashboard />} />
    </Routes>
  );
}
