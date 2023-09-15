import Copier from "components/Copier";

export default function Snippet({ classes = "" }) {
  return (
    <div className={classes}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Copy / paste this code snippet:
      </h2>
      <div className="flex items-center justify-center gap-4 h-32 w-full max-w-xl px-10 rounded bg-gray-l3 dark:bg-blue-d4">
        <span className="w-full text-sm sm:text-base font-mono break-all">
          {""}
        </span>
        <Copier classes="w-10 h-10 hover:text-orange" text={""} />
      </div>
    </div>
  );
}
