import { useLoaderData } from "react-router-dom";
import type { Program as TProgram } from "types/aws";
import { Program } from "./Program";

export default function List() {
  const programs = useLoaderData() as TProgram[];

  return (
    <div className="@container grid gap-3 p-4 @lg:p-8 border border-gray-l4 rounded bg-white dark:bg-blue-d6">
      {programs.map((p) => (
        <Program {...p} key={p.id} />
      ))}
    </div>
  );
}
