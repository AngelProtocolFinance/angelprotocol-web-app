import { CircleAlert } from "lucide-react";

import { Form } from "./form";

import { imgEditorStyles } from "components/img-editor";
import { richTextStyles } from "components/rich-text";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";

export { ErrorBoundary } from "components/error";
export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const links: Route.LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];
export default CacheRoute(Page);

const containerClass = "xl:container xl:mx-auto px-5 mt-8 grid content-start";
function Page({ loaderData }: Route.ComponentProps) {
  const { fund, user, base_url } = loaderData;

  if (
    !user.funds.includes(fund.id) &&
    !user.endowments.map((n) => n.toString()).includes(fund.creator_id) &&
    !user.groups.includes("ap-admin")
  ) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  if (!fund.active) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">This fund is already closed</p>
      </div>
    );
  }

  return (
    <Form
      {...fund}
      classes={containerClass}
      base_url={base_url}
      init_slug={fund.slug}
    />
  );
}
