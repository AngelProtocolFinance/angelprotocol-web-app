import { Route, Routes } from "react-router-dom";
import { LinkGroup } from "../Layout/types";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout/Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Applications from "./Applications";
import Templates from "./Templates";

export default function Review() {
  const { proposal, proposals, templates } = adminRoutes;
  return (
    <Routes>
      <Route element={<Layout linkGroups={linkGroups} />}>
        <Route path={`${proposal.url}/:id`} element={<Proposal />} />
        <Route path={proposals.url} element={<Proposals />} />
        <Route path={`${templates.url}/*`} element={<Templates />} />
        <Route index element={<Applications />} />
      </Route>
    </Routes>
  );
}

const linkGroups: LinkGroup[] = [{ links: ["index", "proposals"] }];
