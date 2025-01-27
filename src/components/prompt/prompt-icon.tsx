import LoaderRing from "components/loader-ring";
import { CircleAlert, CircleCheck } from "lucide-react";
import type { Props } from "./types";

export function PromptIcon({
  type,
  classes = "",
}: Pick<Props, "type"> & { classes?: string }) {
  const common = `justify-self-center ${classes}`;
  switch (type) {
    case "success":
      return <CircleCheck size={92} className={common + " text-green"} />;
    case "error":
      return <CircleAlert size={80} className={common + " text-red"} />;
    case "loading":
      return <LoaderRing thickness={12} classes={common + " h-24"} />;
    default:
      return null;
  }
}
