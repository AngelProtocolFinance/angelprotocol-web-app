import { adminRoutes, appRoutes } from "constants/routes";
import Layout from "layout/DashboardLayout";
import type { RouteObject } from "react-router-dom";
import { Component as Widget } from "../../Widget";
import { useAdminContext } from "../Context";
import SidebarHeader from "../SidebarHeader";
import { linkGroups } from "../constants";
import Banking, { NewPayoutMethod, PayoutMethodDetails } from "./Banking";
import { mediaRoutes } from "./Media";

export const charityRoute: RouteObject = {
  element: (
    <Layout
      rootRoute={`${appRoutes.admin}/:id/`}
      linkGroups={linkGroups}
      sidebarHeader={<SidebarHeader />}
    />
  ),
  children: [
    { path: adminRoutes.donations, lazy: () => import("./Donations") },
    { path: adminRoutes.edit_profile, lazy: () => import("./EditProfile") },
    { path: adminRoutes.programs, lazy: () => import("./Programs") },
    {
      path: adminRoutes.program_editor + "/:programId",
      lazy: () => import("./ProgramEditor"),
    },
    { path: adminRoutes.settings, lazy: () => import("./Settings") },
    { path: adminRoutes.members, lazy: () => import("./Members") },
    {
      path: adminRoutes.banking,
      children: [
        { index: true, element: <Banking /> },
        { path: "new", element: <NewPayoutMethod /> },
        { path: ":bankId", element: <PayoutMethodDetails /> },
      ],
    },
    { path: adminRoutes.form_builder, element: <EndowWidget /> },
    { path: adminRoutes.funds, lazy: () => import("./Funds") },
    { index: true, lazy: () => import("./Dashboard") },
    ...mediaRoutes,
  ],
};

function EndowWidget() {
  //widget configurer is used in admin
  const { id: endowId } = useAdminContext();
  return <Widget endowId={endowId} />;
}
