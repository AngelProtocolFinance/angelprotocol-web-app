import PromptV2 from "components/Prompt/PromptV2";
import { adminRoutes } from "constants/routes";
import { ErrorElement } from "errors/ErrorElement";
import { Navigate, type RouteObject } from "react-router-dom";
import Banking, {
  NewPayoutMethod,
  PayoutMethodDetails,
  payoutMethodsLoader,
  payoutMethodLoader,
  newBanking,
} from "./Banking";
import { dashboardRoute } from "./Dashboard/route";
import { mediaRoutes } from "./Media";

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
  { path: adminRoutes.members, lazy: () => import("./Members") },
  {
    path: adminRoutes.banking,
    children: [
      { index: true, element: <Banking />, loader: payoutMethodsLoader },
      { path: "new", element: <NewPayoutMethod />, action: newBanking },
      {
        path: ":bankId",
        element: <PayoutMethodDetails />,
        loader: payoutMethodLoader,
      },
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
