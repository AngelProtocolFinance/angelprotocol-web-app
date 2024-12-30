import type { Program as IProgram } from "@better-giving/endowment";
import { Info } from "components/Status";
import { useLoaderData } from "react-router";
import { Program } from "./Program";

export default function List() {
  const programs = useLoaderData() as IProgram[];

  return (
    <div className="@container grid gap-3 p-4 @lg:p-8 border border-gray-l4 rounded bg-white dark:bg-blue-d6">
      {programs.length === 0 ? (
        <Info>No programs</Info>
      ) : (
        programs.map((p) => <Program {...p} key={p.id} />)
      )}
    </div>
  );
}
