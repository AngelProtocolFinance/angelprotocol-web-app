import type { ReactNode } from "react";
import { ClientOnly } from "remix-utils/client-only";

export const clientOnly = (node: ReactNode, fallback?: ReactNode) => (
  <ClientOnly fallback={fallback}>{() => node}</ClientOnly>
);
