import QueryLoader from "components/QueryLoader";
import { useParams } from "react-router-dom";
import { useProgramQuery } from "services/aws/programs";
import { useAdminContext } from "../../Context";
import Form from "./Form";

export default function ProgramEditor() {
  const { id: programId = "" } = useParams();
  const { id: endowId } = useAdminContext();
  const programQuery = useProgramQuery(
    { endowId, programId },
    { skip: !programId }
  );

  return (
    <QueryLoader
      queryState={programQuery}
      messages={{ loading: "Loading program", error: "Failed to load program" }}
    >
      {(p) => <Form {...p} />}
    </QueryLoader>
  );
}
