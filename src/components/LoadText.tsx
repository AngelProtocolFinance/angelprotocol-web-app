import Icon from "components/Icon";
import type { PropsWithChildren } from "react";

export default function LoadText({
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
