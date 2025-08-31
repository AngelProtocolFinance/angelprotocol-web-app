import styles from "cropperjs/dist/cropper.css?url";
import type { LinkDescriptor } from "react-router";

export { default, ControlledImgEditor } from "./img-editor";
export * from "./types";

export const imgEditorStyles: LinkDescriptor[] = [
  { rel: "stylesheet", href: styles },
];
