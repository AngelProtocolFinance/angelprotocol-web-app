import type { Program as TProgram } from "@better-giving/endowment";
import { Link } from "@remix-run/react";
import Image from "components/Image";
import { RichText } from "components/RichText";

export default function Programs({ programs }: { programs: TProgram[] }) {
  return (
    <div className="w-full h-full px-8 py-10 grid sm:grid-cols-[repeat(auto-fill,minmax(373px,1fr))] gap-8">
      {programs.map((p) => (
        <Program {...p} key={p.id} />
      ))}
    </div>
  );
}

function Program(props: TProgram) {
  return (
    <div className="border border-gray-l4 rounded relative group overflow-hidden">
      <Link
        to={`program/${props.id}`}
        className="absolute inset-0 group-hover:border group-hover:border-blue-d1 dark:group-hover:border-blue"
      />
      <Image src={props.banner} className="h-64 w-full object-cover" />
      <div className="p-5">
        <p className="text-lg font-bold mb-3 block">{props.title}</p>
        <RichText
          content={{ value: props.description }}
          readOnly
          classes={{ field: "overflow-hidden h-32" }}
        />
      </div>
    </div>
  );
}
