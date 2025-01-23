import { useCachedLoaderData } from "api/cache";
import { RmxForm, useRmxForm } from "components/form";
import List from "./List";
import type { LoaderData } from "./api";

export { clientLoader } from "api/cache";
export { loader, action } from "./api";
export { ErrorBoundary } from "components/error";

export default function Programs() {
  const { nav } = useRmxForm();
  const { programs } = useCachedLoaderData<LoaderData>();

  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <RmxForm method="POST" className="flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">Programs</h2>
        <button disabled={nav.state !== "idle"} className="btn-blue px-8 py-2">
          {nav.state === "submitting" ? "Creating..." : "Create Program"}
        </button>
      </RmxForm>
      <List programs={programs} />
    </div>
  );
}
