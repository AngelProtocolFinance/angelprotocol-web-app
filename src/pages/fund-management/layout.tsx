import { Footer } from "components/footer";
import { metas } from "helpers/seo";
import { Layout } from "layout/dashboard";
import { CircleAlert } from "lucide-react";
import { href } from "react-router";
import type { Route } from "./+types/layout";
import { linkGroups } from "./constants";
import { Header } from "./header";
import { cognito, to_auth } from ".server/auth";

export const meta: Route.MetaFunction = () =>
  metas({ title: "Fund Management" });

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  return user;
};

export default function Page({ loaderData: user }: Route.ComponentProps) {
  if (!user.groups.includes("ap-admin")) {
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
        rootRoute={href("/fund-mgmt")}
        linkGroups={linkGroups}
        //dummy header
        sidebarHeader={<div className="h-5" />}
      />
      <Footer />
    </div>
  );
}
