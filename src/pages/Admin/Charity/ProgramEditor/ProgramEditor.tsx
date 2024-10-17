import Icon from "components/Icon";
import { adminRoutes } from "constants/routes";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import type { Program } from "types/aws";
import Form from "./Form";

export default function ProgramEditor() {
  const program = useLoaderData() as Program;
  return (
    <>
      <Link
        to={"../" + adminRoutes.programs}
        className="flex items-center gap-2 text-blue-d1 hover:text-blue"
      >
        <Icon type="Back" />
        <span>Back</span>
      </Link>
      <Form {...program} />
    </>
  );
}
