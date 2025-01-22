import type { LinksFunction } from "@vercel/remix";
import { richTextStyles } from "components/RichText";
export { ErrorModal as ErrorBoundary } from "components/error";
export { default } from "./GeneralInfo";
export { loader } from "./api";

export const links: LinksFunction = () => [...richTextStyles];
