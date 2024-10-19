import PromptV2 from "components/Prompt/PromptV2";
import { adminRoutes } from "constants/routes";
import { ErrorElement } from "errors/ErrorElement";
import type { RouteObject } from "react-router-dom";
import Banking, {
  NewPayoutMethod,
  PayoutMethodDetails,
  payoutMethodsLoader,
  payoutMethodLoader,
} from "./Banking";
import { mediaRoutes } from "./Media";

export const charityRoutes: RouteObject[] = [
  { path: adminRoutes.donations, lazy: () => import("./Donations") },
  { path: adminRoutes.edit_profile, lazy: () => import("./EditProfile") },
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
      { path: "new", element: <NewPayoutMethod /> },
      {
        path: ":bankId",
        element: <PayoutMethodDetails />,
        loader: payoutMethodLoader,
      },
    ],
  },
  { path: adminRoutes.form_builder, lazy: () => import("../../Widget") },
  { index: true, lazy: () => import("./Dashboard") },
  ...mediaRoutes,
];
