import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout";
import { LINKS } from "../constants";
import Banking from "./Banking";
import Dashboard from "./Dashboard";
import Donations from "./Donations";
import EditProfile from "./EditProfile";
import PayoutMethods from "./PayoutMethods";
import ProgramEditor from "./ProgramEditor";
import Programs from "./Programs";
import Widget from "./Widget";

export default function Charity() {
  return (
    <Routes>
      <Route
        element={
          <Layout
            linkGroups={[
              { links: [LINKS.dashboard, LINKS.donations] },
              { title: "Profile", links: [LINKS.edit_profile, LINKS.programs] },
              { title: "Manage", links: [LINKS.banking] },
            ]}
          />
        }
      >
        <Route path={adminRoutes.donations} element={<Donations />} />
        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route path={adminRoutes.programs} element={<Programs />} />
        <Route
          path={adminRoutes.program_editor + "/:id"}
          element={<ProgramEditor />}
        />
        <Route path={adminRoutes.widget_config} element={<Widget />} />
        <Route path={adminRoutes.banking} element={<Banking />} />
        <Route path="payout-methods" element={<PayoutMethods />} />
        <Route index element={<Dashboard />} />
        <Route
          path="*"
          element={<Navigate replace to={adminRoutes.edit_profile} />}
        />
      </Route>
    </Routes>
  );
}
