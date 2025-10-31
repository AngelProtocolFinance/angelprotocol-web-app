import { RmxForm, useRmxForm } from "components/form";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import List from "./list";

export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);

function Page({ loaderData: { programs } }: Route.ComponentProps) {
  const { nav } = useRmxForm();

  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 px-6 py-4 md:px-10 md:py-8">
      <RmxForm method="POST" className="flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">Programs</h2>
        <button
          disabled={nav.state !== "idle"}
          className="btn btn-blue px-8 py-2"
        >
          {nav.state === "submitting" ? "Creating..." : "Create Program"}
        </button>
      </RmxForm>
      <List programs={programs} />
    </div>
  );
}
