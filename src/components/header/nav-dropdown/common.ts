import { nav_link_class_fn } from "helpers/create-navlink-styler";

export const styles =
  "group font-medium hover:text-gray-d4 text-[15px] w-full grid grid-cols-subgrid col-span-2 items-center";
export const styler = nav_link_class_fn(
  styles,
  "pointer-events-none text-blue-d1",
  ""
);
