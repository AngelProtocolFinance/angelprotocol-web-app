import Image from "components/Image";
import RichText from "components/RichText";
import { Link } from "react-router-dom";
import { Program as TProgram } from "types/aws";
import { useProfileContext } from "../../ProfileContext";

export default function Programs() {
  const { program } = useProfileContext();
  return (
    <div className="w-full h-full px-8 py-10 grid sm:grid-cols-[repeat(auto-fill,minmax(373px,1fr))] gap-8">
      {program.map((p) => (
        <Program {...p} key={p.program_id} />
      ))}
    </div>
  );
}

function Program(props: TProgram) {
  return (
    <div className="border border-gray-l4 rounded relative group overflow-hidden">
      <Link
        to={`program/${props.program_id}`}
        className="absolute inset-0 group-hover:border group-hover:border-blue-d1 dark:group-hover:border-blue"
      />
      <Image src={props.program_banner} className="h-64 w-full object-cover" />
      <div className="p-5">
        <p className="text-lg font-bold mb-3 block">{props.program_title}</p>
        <RichText
          content={{ value: props.program_description }}
          readOnly
          classes={{ container: "overflow-hidden h-32" }}
        />
      </div>
    </div>
  );
}
