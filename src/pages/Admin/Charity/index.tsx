import { PromptV2 } from "components/Prompt";
import { adminRoutes } from "constants/routes";
import { ErrorElement } from "errors/ErrorElement";
import { Navigate, type RouteObject } from "react-router-dom";
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
  { path: adminRoutes.donations, lazy: () => import("./Donations") },
  {
    path: adminRoutes.edit_profile,
    lazy: () => import("./EditProfile"),
    errorElement: <ErrorElement />,
    children: [
      {
        path: "success",
        element: <PromptV2 type="success" children="Profile updated" />,
      },
    ],
  },
  { path: adminRoutes.programs, lazy: () => import("./Programs") },
  {
    path: adminRoutes.program_editor + "/:programId",
    lazy: () => import("./ProgramEditor"),
  },
  {
    path: adminRoutes.settings,
    lazy: () => import("./Settings"),
    errorElement: <ErrorElement />,
    children: [
      {
        path: "success",
        element: <PromptV2 type="success" children="Settings updated" />,
      },
    ],
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
  { path: adminRoutes.form_builder, lazy: () => import("../../Widget") },
  dashboardRoute,
  {
    index: true,
    element: <Navigate to={adminRoutes.dashboard} />,
  },

  ...mediaRoutes,
];
