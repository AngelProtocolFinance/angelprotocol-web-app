import PromptV2 from "components/Prompt/PromptV2";
import { adminRoutes } from "constants/routes";
import { ErrorElement } from "errors/ErrorElement";
import type { RouteObject } from "react-router-dom";
import type { Allocation, BalanceTxsPage, EndowmentBalances } from "types/aws";
import { MoveFundForm } from "./MoveFundForm";
import { Edit } from "./Schedule";
import { moveFundAction } from "./move-fund-action";

export type DashboardData = {
  alloc: Allocation;
  bal: EndowmentBalances;
  balTxs: BalanceTxsPage;
};

export const dashboardRoute: RouteObject = {
  id: "dashboard",
  path: adminRoutes.dashboard,
  lazy: () => import("./index"),
  errorElement: <ErrorElement />,
  children: [
    { path: "edit-alloc", element: <Edit /> },
    { path: "move-funds", element: <MoveFundForm />, action: moveFundAction },
    {
      path: "success",
      element: <PromptV2 type="success" children="Successfully updated" />,
    },
  ],
};
