import { Navigate, Route, Routes } from "react-router-dom";
import { LinkGroup } from "../Sidebar/types";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import { LINKS } from "../constants";
import Templates from "./Templates";

const LINK_GROUPS: LinkGroup[] = [
  { title: "Manage", links: [LINKS.proposals] },
];

export default function Core() {
  return (
    <Routes>
      <Route element={<Layout linkGroups={LINK_GROUPS} />}>
        <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
        <Route path={adminRoutes.proposals} element={<Proposals />} />
        <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
        <Route index element={<Navigate to={adminRoutes.proposals} />} />
      </Route>
    </Routes>
  );
}
