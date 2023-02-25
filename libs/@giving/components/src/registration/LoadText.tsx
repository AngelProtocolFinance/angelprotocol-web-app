import { PropsWithChildren } from "react";
import Icon from "../Icon";

export function LoadText({
  text = "Submitting...",
  isLoading,
  children,
}: PropsWithChildren<{ isLoading?: boolean; text?: string }>) {
  return isLoading ? (
    <>
      <Icon
        type="Loading"
        className="inline animate-spin mr-1 bottom-px relative"
      />
      {text}
    </>
  ) : (
    <>{children}</>
  );
}
