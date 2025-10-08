import { LoaderCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

export function LoadText({
  text = "Submitting...",
  is_loading,
  children,
}: PropsWithChildren<{ is_loading?: boolean; text?: string }>) {
  return is_loading ? (
    <>
      <LoaderCircle className="inline animate-spin mr-1 bottom-px relative" />
      {text}
    </>
  ) : (
    <>{children}</>
  );
}
