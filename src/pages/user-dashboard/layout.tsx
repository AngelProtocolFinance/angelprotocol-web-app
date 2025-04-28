import type { MetaFunction } from "@vercel/remix";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import DashboardLayout from "layout/dashboard";
import { linkGroups } from "./routes";

export const meta: MetaFunction = () => metas({ title: "My Donations" });

export default function Layout() {
  return (
    <DashboardLayout
      rootRoute={`${appRoutes.user_dashboard}/`}
      linkGroups={linkGroups}
      //dummy header
      sidebarHeader={<div className="h-5" />}
    />
  );
}
