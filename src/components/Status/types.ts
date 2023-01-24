import { PropsWithChildren } from "react";
import { IconBaseProps } from "react-icons";
import { IconType } from "../Icon";

export type StatusProps<T extends JSX.Element | IconType> = PropsWithChildren<{
  icon: T;
  classes?: string;
  gap?: string;
  iconOptions?: T extends IconType ? IconBaseProps : never;
}>;
