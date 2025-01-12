import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import { cognito, redirectToAuth } from "auth";
import Footer from "components/Footer";
import { appRoutes } from "constants/routes";
import Layout from "layout/DashboardLayout";
import { CircleAlert } from "lucide-react";
import { parse } from "valibot";
import type { AdminContext } from "./Context";
import Header from "./Header";
import SidebarHeader from "./SidebarHeader";
import { linkGroups } from "./constants";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const id = parse(plusInt, params.id);
  return {
    user,
    id,
    endow: getEndow(id, ["name", "logo"]),
  } satisfies AdminContext;
};

export default function AdminLayout() {
  const context = useLoaderData() as AdminContext;
  if (
    !context.user.endowments.includes(context.id) &&
    !context.user.groups.includes("ap-admin")
  ) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="grid">
      <Header classes="sticky z-40 top-[-1px]" />
      <Layout
        rootRoute={`${appRoutes.admin}/:id/`}
        linkGroups={linkGroups}
        sidebarHeader={<SidebarHeader endow={context.endow} />}
        context={context}
      />
      <Footer />
    </div>
  );
}
