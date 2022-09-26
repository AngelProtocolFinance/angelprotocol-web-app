import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Templates from "./Templates";

export default function Views() {
  return (
    <Routes>
      <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
      <Route path={adminRoutes.proposals} element={<Proposals />} />
      <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
      <Route index element={<Navigate to={adminRoutes.proposals} />} />
    </Routes>
  );
}
