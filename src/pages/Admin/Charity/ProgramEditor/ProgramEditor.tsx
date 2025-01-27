import type { Program } from "@better-giving/endowment";
import { Link } from "@remix-run/react";
import type { LinksFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { imgEditorStyles } from "components/img-editor";
import { richTextStyles } from "components/rich-text";
import { adminRoutes } from "constants/routes";
import { ChevronLeft } from "lucide-react";
import Form from "./Form";

export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];
export { loader, action } from "./api";
export { clientLoader } from "api/cache";
export { ErrorBoundary } from "components/error";
export default function ProgramEditor() {
  const program = useCachedLoaderData<Program>();
  return (
    <>
      <Link
        to={"../" + adminRoutes.programs}
        className="flex items-center gap-2 text-blue-d1 hover:text-blue"
      >
        <ChevronLeft />
        <span>Back</span>
      </Link>
      <Form {...program} />
    </>
  );
}
