import { imgEditorStyles } from "components/img-editor";
import { richTextStyles } from "components/rich-text";
import type { LinksFunction } from "react-router";
export { ErrorBoundary } from "components/error";
export { default } from "./edit-fund";
export { loader, action } from "./api";
export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];
