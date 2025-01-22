import type { Endow } from "@better-giving/endowment";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import Footer from "components/Footer";
import { appRoutes } from "constants/routes";
import Layout from "layout/DashboardLayout";
import { CircleAlert } from "lucide-react";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
import Header from "./Header";
import SidebarHeader from "./SidebarHeader";
import { linkGroups } from "./constants";
import { cognito, redirectToAuth } from ".server/auth";

interface LoaderData {
  id: number;
  user: UserV2;
  /** need to be awaited */
  endow: Promise<Pick<Endow, "logo" | "name">>;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const id = parse(plusInt, params.id);
  return {
    user,
    id,
    endow: getEndow(id, ["name", "logo"]),
  } satisfies LoaderData;
};

export default function AdminLayout() {
  const data = useLoaderData() as LoaderData;
  if (
    !data.user.endowments.includes(data.id) &&
    !data.user.groups.includes("ap-admin")
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
        sidebarHeader={<SidebarHeader endow={data.endow} />}
      />
      <Footer />
    </div>
  );
}
