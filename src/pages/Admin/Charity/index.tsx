import { adminRoutes } from "constants/routes";
import type { RouteObject } from "react-router-dom";
import { Component as Widget } from "../../Widget";
import { useAdminContext } from "../Context";
import Banking, { NewPayoutMethod, PayoutMethodDetails } from "./Banking";
import { mediaRoutes } from "./Media";

export const charityRoutes: RouteObject[] = [
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
  { index: true, lazy: () => import("./Dashboard") },
  ...mediaRoutes,
];

function EndowWidget() {
  //widget configurer is used in admin
  const { id: endowId } = useAdminContext();
  return <Widget endowId={endowId} />;
}
