import { useRouteLoaderData } from "react-router";
import type { DashboardData } from "./api";

export const use_dashboard_data = () => {
  return useRouteLoaderData("dashboard") as DashboardData;
};
