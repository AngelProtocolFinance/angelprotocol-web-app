import type { LinksFunction } from "@vercel/remix";
import { imgEditorStyles } from "components/ImgEditor";
import { richTextStyles } from "components/RichText";
export { ErrorBoundary } from "components/error";
export { default } from "./EditFund";
export { loader, action } from "./api";
export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];
