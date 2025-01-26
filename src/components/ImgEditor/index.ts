import type { LinkDescriptor } from "@vercel/remix";
import styles from "cropperjs/dist/cropper.css?url";

export { default, ControlledImgEditor } from "./ImgEditor";
export * from "./types";

export const imgEditorStyles: LinkDescriptor[] = [
  { rel: "stylesheet", href: styles },
];
