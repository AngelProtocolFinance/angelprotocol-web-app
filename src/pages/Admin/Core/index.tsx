import { Navigate, Route, Routes } from "react-router-dom";
import { LinkGroup } from "../Layout/types";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout/Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Templates from "./Templates";

export default function Core() {
  const { proposal, proposals, templates } = adminRoutes;
  return (
    <Routes>
      <Route element={<Layout linkGroups={linkGroups} />}>
        <Route path={`${proposal.url}/:id`} element={<Proposal />} />
        <Route path={proposals.url} element={<Proposals />} />
        <Route path={`${templates.url}/*`} element={<Templates />} />
        <Route index element={<Navigate to={proposals.url} />} />
      </Route>
    </Routes>
  );
}

const linkGroups: LinkGroup[] = [
  {
    links: ["proposals"],
  },
];
