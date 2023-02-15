import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Nav from "./Nav";
import Templates from "./Templates";

export default function Core() {
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
        <Route index element={<Navigate to={adminRoutes.proposals} />} />
      </Route>
    </Routes>
  );
}
