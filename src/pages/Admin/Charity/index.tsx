import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Invest from "./Invest";
import Nav from "./Nav";
import Templates from "./Templates";
import Withdraws from "./Withdraws";
import { routes } from "./routes";

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
        <Route path={routes.invest} element={<Invest />} />
        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
