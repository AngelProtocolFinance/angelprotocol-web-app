import { appRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import DashboardLayout from "layout/DashboardLayout";
import type { RouteObject } from "react-router-dom";
import Donations from "./Donations";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import { linkGroups, routes } from "./routes";

const Root = withAuth(function Layout() {
  return (
    <DashboardLayout
      rootRoute={`${appRoutes.user_dashboard}/`}
      linkGroups={linkGroups}
      //dummy header
      sidebarHeader={<div className="h-5" />}
    />
  );
});

export const userDashboardRoute: RouteObject = {
  path: appRoutes.user_dashboard,
  element: <Root />,
  children: [
    { path: routes.edit_profile, element: <EditProfile /> },
    { path: routes.donations, element: <Donations /> },
    { path: routes.settings, element: <Settings /> },
  ],
};
