import { richTextStyles } from "components/rich-text";
import type { LinksFunction } from "react-router";
export { ErrorBoundary } from "components/error";
export { default } from "./general-info";
export { loader } from "./api";

export const links: LinksFunction = () => [...richTextStyles];
