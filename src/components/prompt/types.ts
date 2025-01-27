import type { PropsWithChildren } from "react";

export type Props = PropsWithChildren<{
  type?: "success" | "error" | "loading";
  headline?: string;
  title?: string;
}>;
