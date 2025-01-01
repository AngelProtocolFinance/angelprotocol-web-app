import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { Navigate, type RouteObject } from "react-router";
import Banking, {
  NewPayoutMethod,
  payoutMethodsLoader,
  newBanking,
  payoutMethodRoute,
} from "./Banking";
import { dashboardRoute } from "./Dashboard/route";
import { mediaRoutes } from "./Media";
import { membersRoute } from "./Members";

export const charityRoutes: RouteObject[] = [
  {
    path: adminRoutes.donations,
    lazy: () => import("./Donations").then(convert),
  },
  {
    path: adminRoutes.edit_profile,
    lazy: () => import("./EditProfile").then(convert),
  },
  {
    path: adminRoutes.programs,
    lazy: () => import("./Programs").then(convert),
  },
  {
    path: adminRoutes.program_editor + "/:programId",
    lazy: () => import("./ProgramEditor").then(convert),
  },
  {
    path: adminRoutes.settings,
    lazy: () => import("./Settings").then(convert),
  },
  membersRoute,
  {
    path: adminRoutes.banking,
    children: [
      { index: true, element: <Banking />, loader: payoutMethodsLoader },
      { path: "new", element: <NewPayoutMethod />, action: newBanking },
      payoutMethodRoute,
    ],
  },
  {
    path: adminRoutes.form_builder,
    lazy: () => import("../../Widget").then(convert),
  },
  dashboardRoute,
  {
    index: true,
    element: <Navigate to={adminRoutes.dashboard} />,
  },

  ...mediaRoutes,
];
