import { useCachedLoaderData } from "api/cache";
import type { LoaderData } from "./api";
export { loader, action } from "./api";
export { clientLoader } from "api/cache";
export { ErrorBoundary } from "components/error";
export default function Settings() {
  const { subs } = useCachedLoaderData<LoaderData>();
  console.log(subs);
  return (
    <div className="grid">
      <h2 className="text-3xl">Settings</h2>
      <p className="mt-4">
        Here, you can update various settings relating to any nonprofit that you
        are a member of.
      </p>
    </div>
  );
}
