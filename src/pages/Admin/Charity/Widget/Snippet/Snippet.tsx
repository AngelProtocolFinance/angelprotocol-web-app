import Copier from "components/Copier";
import { TITLE_STYLE } from "../constants";

export default function Snippet() {
  return (
    <div>
      <h2 className={`${TITLE_STYLE} mt-10`}>
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
