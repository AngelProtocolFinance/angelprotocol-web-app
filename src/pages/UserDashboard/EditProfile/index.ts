import type { LinksFunction } from "@vercel/remix";
import { imgEditorStyles } from "components/ImgEditor";

export { default } from "./Form";
export { action, loader } from "./api";
export const links: LinksFunction = () => [...imgEditorStyles];
