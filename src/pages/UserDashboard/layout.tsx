import { type LoaderFunction, useLoaderData } from "@remix-run/react";
import { loadAuth, redirectToAuth } from "auth";
import { appRoutes } from "constants/routes";
import DashboardLayout from "layout/DashboardLayout";
import { linkGroups } from "./routes";

export default function Layout() {
  const user = useLoaderData();

  return (
    <DashboardLayout
      rootRoute={`${appRoutes.user_dashboard}/`}
      linkGroups={linkGroups}
      //dummy header
      sidebarHeader={<div className="h-5" />}
      context={user}
    />
  );
}

export const clientLoader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (auth) return auth;
  return redirectToAuth(request);
};
