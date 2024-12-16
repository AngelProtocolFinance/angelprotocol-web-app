import type { Application } from "@better-giving/registration/approval";
import LoaderRing from "components/LoaderRing";
import Seo from "components/Seo";
import { ErrorStatus } from "components/Status";
import { CircleAlert } from "lucide-react";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import type { UserV2 } from "types/auth";
import Loaded from "./Loaded";

export function Component() {
  const { application, user } = useLoaderData() as {
    user: UserV2;
    application: Application;
  };

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

      <Suspense
        fallback={
          <LoaderRing thickness={10} classes="w-32 justify-self-center" />
        }
      >
        <Await
          resolve={application}
          errorElement={
            <ErrorStatus classes="justify-self-center">
              Failed to load application details
            </ErrorStatus>
          }
        >
          {(data: Application) => <Loaded {...data} />}
        </Await>
      </Suspense>
    </div>
  );
}
