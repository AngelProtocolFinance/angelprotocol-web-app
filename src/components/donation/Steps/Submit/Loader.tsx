import LoaderRing from "components/LoaderRing";

type Props = {
  msg?: string;
};
export default function Loader({ msg }: Props) {
  return (
    <div className="grid place-items-center content-center gap-6 p-4 @md/steps:p-8">
      <LoaderRing
        thickness={10}
        classes={{ container: "w-32", ringToColor: "to-[--accent-primary]" }}
      />
      {msg && <p className="text-center">{msg}</p>}
    </div>
  );
}
