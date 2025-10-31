import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { EndowAlertForm } from "./endow-alert-form";
export { ErrorBoundary } from "components/error";
import type { Route } from "./+types";

export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export default CacheRoute(Page);
function Page({ loaderData }: Route.ComponentProps) {
  const { user, user_npos } = loaderData;
  return (
    <div className="grid px-6 py-4 md:px-10 md:py-8">
      <h2 className="text-3xl">Settings</h2>
      <p className="mt-4">
        Here, you can update various settings relating to any nonprofit that you
        are a member of.
      </p>
      <EndowAlertForm
        user={user}
        user_npos={user_npos}
        classes="mt-4 justify-self-start"
      />
    </div>
  );
}
