import type { PropsWithChildren, ReactNode } from "react";

export type StatusProps = PropsWithChildren<{
  icon: ReactNode;
  inline?: boolean;
  classes?: string;
  gap?: string;
}>;
