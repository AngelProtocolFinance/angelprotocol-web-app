import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Applications from "./AP/Applications";
import { AdminGuard } from "./AdminGuard";
import AdminNav from "./AdminNav";
import Proposal from "./Proposal";
import Proposals from "./Proposals/Proposals";
import Proposer from "./Templates";

export default function Admin() {
  return (
    <AdminGuard>
      <div className="padded-container min-h-3/4 grid grid-rows-a1 pb-4 gap-2">
        <AdminNav />
        <Routes>
          <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
          <Route path={`${adminRoutes.templates}/*`} element={<Proposer />} />
          <Route path={adminRoutes.proposals} element={<Proposals />} />

          {/** show only on ap-admin addr */}
          <Route
            path={adminRoutes.charity_applications}
            element={<Applications />}
          />

          {/** show dashbooard if endowment admin */}
          <Route index element={<Navigate to={adminRoutes.proposals} />} />
        </Routes>
      </div>
    </AdminGuard>
  );
}
