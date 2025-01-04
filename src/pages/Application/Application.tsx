import type { Application as IApplication } from "@better-giving/registration/approval";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/react";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import Seo from "components/Seo";
import { CircleAlert } from "lucide-react";
import type { UserV2 } from "types/auth";
import Loaded from "./Loaded";

export interface LoaderData {
  user: UserV2;
  application: IApplication;
}

export const clientLoader: LoaderFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const application = await ap
    .get<IApplication>(`${ver(1)}/registrations/${params.id}`, {
      headers: { authorization: auth.idToken },
    })
    .json();

  return {
    application,
    user: auth,
  } satisfies LoaderData;
};

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
      <Seo title="Application review" />
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Applications Review - Details
      </h1>

      <Loaded {...application} />
    </div>
  );
}
