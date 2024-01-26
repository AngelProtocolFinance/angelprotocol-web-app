import { adminRoutes } from "constants/routes";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import { LINKS } from "../constants";
import Banking, { NewPayoutMethod, PayoutMethodDetails } from "./Banking";
import Dashboard from "./Dashboard";
import Donations from "./Donations";
import EditProfile from "./EditProfile";
import Members from "./Members/Members";
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
              {
                title: "Manage",
                links: [LINKS.members, LINKS.banking, LINKS.widget_config],
              },
            ]}
          />
        }
      >
        <Route path={adminRoutes.donations} element={<Donations />} />

        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route path={adminRoutes.programs} element={<Programs />} />
        <Route
          path={`${adminRoutes.program_editor}/:id`}
          element={<ProgramEditor />}
        />

        <Route path={adminRoutes.members} element={<Members />} />
        <Route path={adminRoutes.banking} element={<Banking />} />
        <Route
          path={`${adminRoutes.banking}/new`}
          element={<NewPayoutMethod />}
        />
        <Route
          path={`${adminRoutes.banking}/:id`}
          element={<PayoutMethodDetails />}
        />
        <Route path={adminRoutes.widget_config} element={<Widget />} />
        <Route index element={<Dashboard />} />
        <Route
          path="*"
          element={<Navigate replace to={adminRoutes.edit_profile} />}
        />
      </Route>
    </Routes>
  );
}
