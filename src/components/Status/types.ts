import type { LucideProps } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { IconType } from "../Icon";

export type StatusProps<T extends JSX.Element | IconType> = PropsWithChildren<{
  icon: T;
  inline?: boolean;
  classes?: string;
  gap?: string;
  iconOptions?: T extends IconType ? LucideProps : never;
}>;
