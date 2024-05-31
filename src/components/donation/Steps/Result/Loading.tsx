import LoaderRing from "components/LoaderRing";

export default function Loading({
  message,
  classes = "",
}: {
  message: string;
  classes?: string;
}) {
  return (
    <div className={`grid place-items-center content-center gap-6 ${classes}`}>
      <LoaderRing
        thickness={10}
        classes={{ container: "w-32", ringToColor: "to-[--accent-primary]" }}
      />
      <p className="text-center">{message}</p>
    </div>
  );
}
