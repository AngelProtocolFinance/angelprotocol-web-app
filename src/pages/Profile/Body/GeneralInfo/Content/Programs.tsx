import { Link } from "react-router-dom";
import { Program as TProgram } from "types/aws";
import Image from "components/Image";
import RichText from "components/RichText";
import { useProfileContext } from "../../../ProfileContext";

export default function Programs() {
  const { program } = useProfileContext();
  return (
    <div className="w-full h-full px-8 py-10 grid grid-cols-[repeat(auto-fill,minmax(373px,1fr))] gap-8">
      {program.map((p) => (
        <Program {...p} key={p.program_id} />
      ))}
    </div>
  );
}

function Program(props: TProgram) {
  return (
    <div className="border border-prim rounded">
      <Image src={props.program_banner} className="h-64 w-full object-cover" />
      <div className="p-5">
        <Link to={"/"} className="text-lg font-bold mb-3 block">
          {props.program_title}
        </Link>
        <RichText content={props.program_description} readOnly />
      </div>
    </div>
  );
}
