import { Navigate, Route, Routes } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import { adminRoutes } from "constants/routes";
import { AdminGuard } from "./AdminGuard";
import AdminNav from "./AdminNav";
import Proposal from "./Proposal";
import Proposals from "./Proposals/Proposals";
import Proposer from "./Templates";
import Applications from "./ap/Applications";

export default function Admin() {
  return (
    <AdminGuard>
      {/**modals in this scope can access AdminGuard context value */}
      <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
        <div className="padded-container min-h-3/4 grid grid-rows-a1 pb-4 gap-2">
          <AdminNav />
          <Routes>
            <Route
              path={`${adminRoutes.proposal}/:id`}
              element={<Proposal />}
            />
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
      </ModalContext>
    </AdminGuard>
  );
}
