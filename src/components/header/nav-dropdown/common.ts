import { nav_link_class_fn } from "helpers/create-navlink-styler";

export const styles =
  "  font-medium w-full hover:underline hover:text-blue-d1 flex items-center gap-x-2";
export const styler = nav_link_class_fn(
  styles,
  "pointer-events-none text-gray-d4",
  "text-blue "
);
