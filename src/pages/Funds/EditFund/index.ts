import type { LinksFunction } from "@vercel/remix";
import { richTextStyles } from "components/RichText";

export { default } from "./EditFund";
export { loader, action } from "./api";
export const links: LinksFunction = () => [...richTextStyles];
