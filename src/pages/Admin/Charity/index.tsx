import { adminRoutes, appRoutes } from "constants/routes";
import Layout from "layout/DashboardLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Widget from "../../Widget";
import { useAdminContext } from "../Context";
import SidebarHeader from "../SidebarHeader";
import { linkGroups } from "../constants";
import Banking, { NewPayoutMethod, PayoutMethodDetails } from "./Banking";
import Dashboard from "./Dashboard";
import Donations from "./Donations";
import EditProfile from "./EditProfile";
import Media from "./Media";
import Videos from "./Media/Videos";
import Members from "./Members/Members";
import ProgramEditor from "./ProgramEditor";
import Programs from "./Programs";
import Settings from "./Settings";

export default function Charity() {
  //widget configurer is used in admin
  const { id: endowId } = useAdminContext();
  return (
    <Routes>
      <Route
        element={
          <Layout
            rootRoute={`${appRoutes.admin}/:id/`}
            linkGroups={linkGroups}
            sidebarHeader={<SidebarHeader />}
          />
        }
      >
        <Route path={adminRoutes.donations} element={<Donations />} />

        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route path={adminRoutes.programs} element={<Programs />} />
        <Route path={adminRoutes.media} element={<Media />} />
        <Route path={adminRoutes.videos} element={<Videos />} />
        <Route
          path={`${adminRoutes.program_editor}/:id`}
          element={<ProgramEditor />}
        />

        <Route path={adminRoutes.settings} element={<Settings />} />
        <Route path={adminRoutes.members} element={<Members />} />
        <Route path={adminRoutes.banking} element={<Banking />} />
        <Route
          path={adminRoutes.banking + "/new"}
          element={<NewPayoutMethod />}
        />
        <Route
          path={adminRoutes.banking + "/:id"}
          element={<PayoutMethodDetails />}
        />
        <Route
          path={adminRoutes.widget_config}
          element={<Widget endowId={endowId} />}
        />
        <Route index element={<Dashboard />} />
        <Route
          path="*"
          element={<Navigate replace to={adminRoutes.edit_profile} />}
        />
      </Route>
    </Routes>
  );
}
