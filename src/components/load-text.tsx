import { LoaderCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

export default function LoadText({
  text = "Submitting...",
  isLoading,
  children,
}: PropsWithChildren<{ isLoading?: boolean; text?: string }>) {
  return isLoading ? (
    <>
      <LoaderCircle className="inline animate-spin mr-1 bottom-px relative" />
      {text}
    </>
  ) : (
    <>{children}</>
  );
}
