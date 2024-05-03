import type { PropsWithChildren } from "react";
import type { IconBaseProps } from "react-icons";
import type { IconType } from "../Icon";

export type StatusProps<T extends JSX.Element | IconType> = PropsWithChildren<{
  icon: T;
  inline?: boolean;
  classes?: string;
  gap?: string;
  iconOptions?: T extends IconType ? IconBaseProps : never;
}>;
