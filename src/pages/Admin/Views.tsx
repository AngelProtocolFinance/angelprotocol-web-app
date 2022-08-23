import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "./Guard";
import Proposal from "./Proposal";
import Proposals from "./Proposals";
import Templates from "./Templates";
import Dashboard from "./charity/Dashboard";
import Applications from "./reviewer/Applications";

export default function Views() {
  const { role } = useAdminResources();
  switch (role) {
    case "reviewer":
      return <ReviewerRoutes />;
    case "charity":
      return <CharityRoutes />;
    default:
      return <ApRoutes />;
  }
}

function ReviewerRoutes() {
  return (
    <Routes>
      <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
      <Route path={adminRoutes.proposals} element={<Proposals />} />
      <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
      <Route index element={<Applications />} />
    </Routes>
  );
}

function ApRoutes() {
  return (
    <Routes>
      <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
      <Route path={adminRoutes.proposals} element={<Proposals />} />
      <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
      <Route index element={<Navigate to={adminRoutes.proposals} />} />
    </Routes>
  );
}

function CharityRoutes() {
  return (
    <Routes>
      <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
      <Route path={adminRoutes.proposals} element={<Proposals />} />
      <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
      <Route index element={<Dashboard />} />
    </Routes>
  );
}
