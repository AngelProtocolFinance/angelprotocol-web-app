import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { cognito, redirectToAuth } from "auth";
import { appRoutes } from "constants/routes";
import DashboardLayout from "layout/DashboardLayout";
import type { UserV2 } from "types/auth";
import { linkGroups } from "./routes";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);
  return user;
};

export default function Layout() {
  const user = useLoaderData<UserV2>();
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
