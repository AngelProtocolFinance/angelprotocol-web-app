import type { LinksFunction } from "@vercel/remix";
import { imgEditorStyles } from "components/img-editor";
import { richTextStyles } from "components/rich-text";
export { ErrorBoundary } from "components/error";
export { default } from "./EditFund";
export { loader, action } from "./api";
export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];
