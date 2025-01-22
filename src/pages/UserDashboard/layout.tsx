import { appRoutes } from "constants/routes";
import DashboardLayout from "layout/DashboardLayout";
import { linkGroups } from "./routes";

export default function Layout() {
  return (
    <DashboardLayout
      rootRoute={`${appRoutes.user_dashboard}/`}
      linkGroups={linkGroups}
      //dummy header
      sidebarHeader={<div className="h-5" />}
    />
  );
}
