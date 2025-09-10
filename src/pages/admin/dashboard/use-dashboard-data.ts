import { useRouteLoaderData } from "@remix-run/react";
import type { DashboardData } from "./api";

export const use_dashboard_data = () => {
  return useRouteLoaderData("dashboard") as DashboardData;
};
