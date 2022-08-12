import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "./Guard";
import Proposal from "./Proposal";
import Proposals from "./Proposals";
import Templates from "./Templates";
import Applications from "./ap/Applications";
import Dashboard from "./charity/Dashboard";

export default function Views() {
  const { isAp } = useAdminResources();
  return (
    <Routes>
      <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
      <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
      <Route path={adminRoutes.proposals} element={<Proposals />} />

      {isAp && (
        <Route
          path={adminRoutes.charity_applications}
          element={<Applications />}
        />
      )}

      <Route
        index
        element={isAp ? <Navigate to={adminRoutes.proposals} /> : <Dashboard />}
      />
    </Routes>
  );
}
