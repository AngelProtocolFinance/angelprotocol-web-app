import { Footer } from "components/footer";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import DashboardLayout from "layout/dashboard";
import type { MetaFunction } from "react-router";
import Header from "./header";
import { linkGroups } from "./routes";

export const meta: MetaFunction = () => metas({ title: "My Donations" });

export default function Layout() {
  return (
    <div className="grid">
      <Header classes="sticky z-40 top-[-1px]" />
      <DashboardLayout
        rootRoute={`${appRoutes.user_dashboard}/`}
        linkGroups={linkGroups}
        //dummy header
        sidebarHeader={<div className="h-5" />}
      />
      <Footer classes="mt-8" />
    </div>
  );
}
