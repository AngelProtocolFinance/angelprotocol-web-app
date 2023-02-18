import { LoaderRing } from "@ap/components";
import { TLoading } from "@ap/slices/gift";

export default function Loading({
  msg,
  classes = "",
}: TLoading & { classes?: string }) {
  return (
    <div className={`grid justify-items-center gap-6 ${classes}`}>
      <LoaderRing thickness={10} classes="w-28" />
      <p className="text-center">{msg}</p>
    </div>
  );
}
