import { Templates } from "../types";
import { templates } from "../constants";

export const routes: { [key in Templates | "index"]: string } = {
  ...templates,
  index: "",
};
