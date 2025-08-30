import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { Footer } from "components/footer";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import Layout from "layout/dashboard";
import { CircleAlert } from "lucide-react";
import type { UserV2 } from "types/auth";
import { linkGroups } from "./constants";
import { Header } from "./header";
import { cognito, toAuth } from ".server/auth";

interface LoaderData {
  user: UserV2;
}

export const meta: MetaFunction = () => metas({ title: "Fund Management" });

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  return {
    user,
  } satisfies LoaderData;
};

export default function AdminLayout() {
  const data = useLoaderData() as LoaderData;
  if (!data.user.groups.includes("ap-admin")) {
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
        rootRoute={appRoutes.fund_management}
        linkGroups={linkGroups}
        //dummy header
        sidebarHeader={<div className="h-5" />}
      />
      <Footer />
    </div>
  );
}
