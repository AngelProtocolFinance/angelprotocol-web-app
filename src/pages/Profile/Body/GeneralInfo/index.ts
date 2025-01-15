import type { LinksFunction } from "@vercel/remix";
import { richTextStyles } from "components/RichText";

export { default } from "./GeneralInfo";
export { loader } from "./api";

export const links: LinksFunction = () => [...richTextStyles];
