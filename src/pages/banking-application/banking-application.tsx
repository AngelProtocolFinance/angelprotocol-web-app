import { metas } from "helpers/seo";
import { Outlet, useLoaderData } from "react-router";
import type { LoaderData } from "./api";
import { Loaded } from "./loaded";
export { loader } from "./api";

export const meta = () => metas({ title: "Banking application review" });
export { ErrorBoundary } from "components/error";
export default function BankingApplication() {
  const bank = useLoaderData() as LoaderData;

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative xl:container xl:mx-auto px-5 py-20">
      <Loaded {...bank} />
      {/** prompts: approve, reject, success */}
      <Outlet />
    </div>
  );
}
