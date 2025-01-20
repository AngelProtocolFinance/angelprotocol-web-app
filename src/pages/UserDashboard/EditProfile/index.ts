import type { LinksFunction } from "@vercel/remix";
import { imgEditorStyles } from "components/ImgEditor";
export { action, loader } from "./api";
export const links: LinksFunction = () => [...imgEditorStyles];
export { ErrorBoundary } from "components/error";
export { default } from "./Form";
