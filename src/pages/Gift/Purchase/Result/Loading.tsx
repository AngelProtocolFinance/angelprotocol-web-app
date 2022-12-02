import { TLoading } from "slices/gift";
import Loader from "./Loader";

export default function Loading({
  msg,
  classes = "",
}: TLoading & { classes?: string }) {
  return (
    <div className={`grid justify-items-center gap-6 ${classes}`}>
      <Loader thickness={10} classes="w-28" />
      <p className="text-center">{msg}</p>
    </div>
  );
}
