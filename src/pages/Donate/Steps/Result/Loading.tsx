import LoaderRing from "components/LoaderRing";

export default function Loading({
  message,
  classes = "",
}: {
  message: string;
  classes?: string;
}) {
  return (
    <div className={`grid justify-items-center gap-6 ${classes}`}>
      <LoaderRing thickness={10} classes="w-32" />
      <p className="text-center">{message}</p>
    </div>
  );
}
