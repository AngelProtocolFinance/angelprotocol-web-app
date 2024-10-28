import QueryLoader from "components/QueryLoader";
import { adminRoutes } from "constants/routes";
import { ChevronLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProgramQuery } from "services/aws/programs";
import { useAdminContext } from "../../Context";
import Form from "./Form";

export default function ProgramEditor() {
  const { programId = "" } = useParams();
  const { id: endowId } = useAdminContext();
  const programQuery = useProgramQuery(
    { endowId, programId },
    { skip: !programId }
  );

  return (
    <>
      <Link
        to={"../" + adminRoutes.programs}
        className="flex items-center gap-2 text-blue-d1 hover:text-blue"
      >
        <ChevronLeft />
        <span>Back</span>
      </Link>
      <QueryLoader
        queryState={programQuery}
        messages={{
          loading: "Loading program",
          error: "Failed to load program",
        }}
        classes={{ container: "mt-2" }}
      >
        {(p) => <Form {...p} />}
      </QueryLoader>
    </>
  );
}
