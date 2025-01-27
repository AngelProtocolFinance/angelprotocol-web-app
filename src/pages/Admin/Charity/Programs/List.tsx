import type { Program as IProgram } from "@better-giving/endowment";
import { Info } from "components/status";
import { Program } from "./Program";

export default function List({ programs }: { programs: IProgram[] }) {
  return (
    <div className="@container grid gap-3 p-4 @lg:p-8 border border-gray-l4 rounded-sm bg-white dark:bg-blue-d6">
      {programs.length === 0 ? (
        <Info>No programs</Info>
      ) : (
        programs.map((p) => <Program {...p} key={p.id} />)
      )}
    </div>
  );
}
