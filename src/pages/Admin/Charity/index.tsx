import { adminRoutes, appRoutes } from "constants/routes";
import Layout from "layout/DashboardLayout";
import type { RouteObject } from "react-router-dom";
import { Component as Widget } from "../../Widget";
import { useAdminContext } from "../Context";
import SidebarHeader from "../SidebarHeader";
import { linkGroups } from "../constants";
import Banking, { NewPayoutMethod, PayoutMethodDetails } from "./Banking";
import Dashboard from "./Dashboard";
import Donations from "./Donations";
import EditProfile from "./EditProfile";
import { mediaRoute } from "./Media/Media";
import Members from "./Members/Members";
import ProgramEditor from "./ProgramEditor";
import Programs from "./Programs";
import Settings from "./Settings";

export const charityRoute: RouteObject = {
  element: (
    <Layout
      rootRoute={`${appRoutes.admin}/:id/`}
      linkGroups={linkGroups}
      sidebarHeader={<SidebarHeader />}
    />
  ),
  children: [
    { path: adminRoutes.donations, element: <Donations /> },
    { path: adminRoutes.edit_profile, element: <EditProfile /> },
    { path: adminRoutes.programs, element: <Programs /> },
    { path: adminRoutes.program_editor, element: <ProgramEditor /> },
    { path: adminRoutes.settings, element: <Settings /> },
    { path: adminRoutes.members, element: <Members /> },
    {
      path: adminRoutes.banking,
      children: [
        { index: true, element: <Banking /> },
        { path: "new", element: <NewPayoutMethod /> },
        { path: ":id", element: <PayoutMethodDetails /> },
      ],
    },
    { path: adminRoutes.widget_config, element: <EndowWidget /> },
    { index: true, element: <Dashboard /> },
    mediaRoute,
  ],
};

function EndowWidget() {
  //widget configurer is used in admin
  const { id: endowId } = useAdminContext();
  return <Widget endowId={endowId} />;
}
