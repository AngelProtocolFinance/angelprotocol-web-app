import type { Endow } from "@better-giving/endowment";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import Footer from "components/footer";
import { appRoutes } from "constants/routes";
import Layout from "layout/dashboard";
import { CircleAlert } from "lucide-react";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
import { linkGroups } from "./constants";
import Header from "./header";
import SidebarHeader from "./sidebar-header";
import { cognito, toAuth } from ".server/auth";
import { getNpo } from ".server/npo";

interface LoaderData {
  id: number;
  user: UserV2;
  endow: Pick<Endow, "logo" | "name">;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(plusInt, params.id);

  const npo = await getNpo(id, ["name", "logo"]);
  if (!npo) return new Response("Not found", { status: 404 });

  return {
    user,
    id,
    endow: npo,
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
        sidebarHeader={<SidebarHeader {...data.endow} />}
      />
      <Footer />
    </div>
  );
}
