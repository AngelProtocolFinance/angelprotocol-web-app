import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout/Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Nav from "./Nav";
import Templates from "./Templates";

export default function Core() {
  const { proposal, proposals, templates } = adminRoutes;
  return (
    <Routes>
      <Route element={<Layout nav={Nav} />}>
        <Route path={`${proposal.url}/:id`} element={<Proposal />} />
        <Route path={proposals.url} element={<Proposals />} />
        <Route path={`${templates.url}/*`} element={<Templates />} />
        <Route index element={<Navigate to={proposals.url} />} />
      </Route>
    </Routes>
  );
}
