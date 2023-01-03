import { PropsWithChildren } from "react";

export type Props = PropsWithChildren<{
  type?: "success" | "error" | "loading" | "info";
  headline?: string;
  title?: string;
}>;
