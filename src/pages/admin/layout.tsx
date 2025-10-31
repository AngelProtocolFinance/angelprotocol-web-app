import { $int_gte1 } from "@better-giving/schemas";
import { Footer } from "components/footer";
import { metas } from "helpers/seo";
import { Layout } from "layout/dashboard";
import { CircleAlert } from "lucide-react";
import { parse } from "valibot";
import type { Route } from "./+types/layout";
import { linkGroups } from "./constants";
import { Header } from "./header";
import SidebarHeader from "./sidebar-header";
import type { LoaderData } from "./types";
import { cognito, to_auth } from ".server/auth";
import { npodb } from ".server/aws/db";

export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  return metas({
    title: `Dashboard - ${d.endow.name}`,
  });
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const id = parse($int_gte1, params.id);

  const npo = await npodb.npo(id, [
    "logo",
    "name",
    "allocation",
    "payout_minimum",
  ]);
  if (!npo) return new Response("Not found", { status: 404 });

  return {
    user,
    id,
    endow: npo,
  } satisfies LoaderData;
};

export default function AdminLayout({
  loaderData: data,
}: Route.ComponentProps) {
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
        rootRoute="/admin/:id/"
        linkGroups={linkGroups}
        sidebarHeader={<SidebarHeader {...data.endow} />}
      />
      <Footer />
    </div>
  );
}
