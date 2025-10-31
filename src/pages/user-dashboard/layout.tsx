import { Footer } from "components/footer";
import { metas } from "helpers/seo";
import { Layout as DashboardLayout } from "layout/dashboard";
import { type MetaFunction, href } from "react-router";
import { Header } from "./header";
import { linkGroups } from "./routes";

export const meta: MetaFunction = () => metas({ title: "My Donations" });

export default function Layout() {
  return (
    <div className="grid">
      <Header classes="sticky z-40 top-[-1px]" />
      <DashboardLayout
        rootRoute={`${href("/dashboard")}/`}
        linkGroups={linkGroups}
        //dummy header
        sidebarHeader={<div className="h-5" />}
      />
      <Footer classes="mt-8" />
    </div>
  );
}
