import type { LinksFunction } from "@vercel/remix";
import { richTextStyles } from "components/rich-text";
export { ErrorBoundary } from "components/error";
export { default } from "./GeneralInfo";
export { loader } from "./api";

export const links: LinksFunction = () => [...richTextStyles];
