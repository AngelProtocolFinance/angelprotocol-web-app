import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Account from "./Account";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Invest from "./Invest";
import Nav from "./Nav";
import Settings from "./Settings";
import StrategyEditor from "./Settings/StrategyEditor";
import Templates from "./Templates";
import Withdraws from "./Withdraws";
import { settings } from "./routes";

export default function Charity() {
  return (
    <Routes>
      <Route
        element={
          <Layout>
            <Nav />
          </Layout>
        }
      >
        <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
        <Route path={adminRoutes.proposals} element={<Proposals />} />
        <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
        <Route path={adminRoutes.withdraws} element={<Withdraws />} />
        <Route path={adminRoutes.account}>
          <Route path="liquid" element={<Account type="liquid" />} />
          <Route path="locked" element={<Account type="locked" />} />
        </Route>
        <Route path={adminRoutes.invest} element={<Invest />} />
        <Route path={adminRoutes.settings}>
          <Route path={settings.edit}>
            <Route path="liquid" element={<StrategyEditor type="liquid" />} />
            <Route path="locked" element={<StrategyEditor type="locked" />} />
          </Route>
          <Route index element={<Settings />} />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
