import { imgEditorStyles } from "components/img-editor";
import type { LinksFunction } from "react-router";
export { action, loader } from "./api";
export const links: LinksFunction = () => [...imgEditorStyles];
export { ErrorBoundary } from "components/error";
export { default } from "./form";
