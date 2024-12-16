import type { Program } from "@better-giving/endowment";
import { adminRoutes } from "constants/routes";
import { ChevronLeft } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "./Form";

export default function ProgramEditor() {
  const program = useLoaderData() as Program;
  return (
    <>
      <Link
        to={"../" + adminRoutes.programs}
        className="flex items-center gap-2 text-blue-d1 hover:text-blue"
      >
        <ChevronLeft />
        <span>Back</span>
      </Link>
      <Form {...program} />
    </>
  );
}
