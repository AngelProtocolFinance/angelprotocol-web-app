import { Route, Routes } from "react-router-dom";
import { LinkGroup } from "../Sidebar/types";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import { LINKS } from "../constants";
import Application from "./Application";
import Applications from "./Applications";
import Templates from "./Templates";

const LINK_GROUPS: LinkGroup[] = [
  { links: [LINKS.index_review] },
  { title: "Manage", links: [LINKS.proposals] },
];

export default function Review() {
  return (
    <Routes>
      <Route element={<Layout linkGroups={LINK_GROUPS} />}>
        <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
        <Route path={adminRoutes.proposals} element={<Proposals />} />
        <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
        <Route path="application/:id" element={<Application />} />
        <Route index element={<Applications />} />
      </Route>
    </Routes>
  );
}
