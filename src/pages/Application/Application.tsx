import type { Application as IApplication } from "@better-giving/registration/approval";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from "auth";
import { metas } from "helpers/seo";
import { CircleAlert } from "lucide-react";
import type { UserV2 } from "types/auth";
import Loaded from "./Loaded";

export interface LoaderData {
  user: UserV2;
  application: IApplication;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const application = await ap
    .get<IApplication>(`${ver(1)}/registrations/${params.id}`, {
      headers: { authorization: user.idToken },
    })
    .json();

  return {
    application,
    user,
  } satisfies LoaderData;
};

export const meta: MetaFunction = ({ data }) => {
  if (!data) return [];
  return metas({
    title: `Application Review - ${(data as LoaderData).application.contact.org_name}`,
  });
};

export { ErrorBoundary } from "components/error";
export default function Application() {
  const { application, user } = useLoaderData() as LoaderData;

  if (!user.groups.includes("ap-admin")) {
    return (
      <div className="grid content-start place-items-center py-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20">
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Applications Review - Details
      </h1>

      <Loaded {...application} />
    </div>
  );
}
