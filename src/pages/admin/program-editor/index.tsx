import { imgEditorStyles } from "components/img-editor";
import { richtext_styles } from "components/rich-text";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { routes } from "../routes";
import type { Route } from "./+types";
import Form from "./form";

export const links: Route.LinksFunction = () => [
  ...richtext_styles,
  ...imgEditorStyles,
];
export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);

function Page({ loaderData: program }: Route.ComponentProps) {
  return (
    <div className="grid px-6 py-4 md:px-10 md:py-8">
      <Link
        to={`../${routes.programs}`}
        className="flex items-center gap-2 text-blue-d1 hover:text-blue"
      >
        <ChevronLeft />
        <span>Back</span>
      </Link>
      <Form {...program} />
    </div>
  );
}
