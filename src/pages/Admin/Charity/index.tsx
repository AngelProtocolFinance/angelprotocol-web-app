import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Nav from "./Nav";
import Settings from "./Settings";
import StrategyEditor from "./Settings/StrategyEditor";
import Templates from "./Templates";
import Withdraws from "./Withdraws";

//prettier-ignore
export default function Charity() {
  return (
    <Routes>
      <Route element={<Layout><Nav /></Layout>}>
        <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
        <Route path={adminRoutes.proposals} element={<Proposals />} />
        <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
        <Route path={adminRoutes.withdraws} element={<Withdraws />} />
        {/** prettier-ignore */}
        <Route path={adminRoutes.settings}>
          <Route path={"edit/liquid"} element={<StrategyEditor type="liquid"/>} />
          <Route path={"edit/locked"} element={<StrategyEditor type="locked"/>} />
          <Route index element={<Settings />} />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
