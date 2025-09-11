import type { IProgram } from "@better-giving/endowment";
import { imgEditorStyles } from "components/img-editor";
import { richTextStyles } from "components/rich-text";
import { adminRoutes } from "constants/routes";
import { ChevronLeft } from "lucide-react";
import { Link, type LinksFunction, useLoaderData } from "react-router";
import Form from "./form";

export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];
export { loader, action } from "./api";
export { ErrorBoundary } from "components/error";
export default function ProgramEditor() {
  const program = useLoaderData<IProgram>();
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
