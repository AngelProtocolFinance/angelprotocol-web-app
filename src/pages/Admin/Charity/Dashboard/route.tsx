import type { Allocation } from "@better-giving/endowment";
import { adminRoutes } from "constants/routes";
import { ErrorElement } from "errors/ErrorElement";
import { convert } from "helpers/route";
import type { RouteObject } from "react-router";
import type { BalanceTxsPage, EndowmentBalances } from "types/aws";
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
  lazy: () => import("./index").then(convert),
  errorElement: <ErrorElement />,
  children: [
    { path: "edit-alloc", element: <Edit /> },
    { path: "move-funds", element: <MoveFundForm />, action: moveFundAction },
  ],
};
