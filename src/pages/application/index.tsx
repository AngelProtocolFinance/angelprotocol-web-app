import { metas } from "helpers/seo";
import { CircleAlert } from "lucide-react";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import Loaded from "./loaded";

export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  if (!d) return [];
  return metas({
    title: `Application Review - ${d.reg.o_name}`,
  });
};

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";

export default CacheRoute(Page);
function Page({ loaderData }: Route.ComponentProps) {
  const { reg, user, wacc } = loaderData;

  if (!user.groups.includes("ap-admin")) {
    return (
      <div className="grid content-start place-items-center py-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative xl:container xl:mx-auto px-5 py-20">
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Applications Review - Details
      </h1>
      <Loaded {...reg} bank={wacc} />
    </div>
  );
}
