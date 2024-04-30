import { adminRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useAdminContext } from "pages/Admin/Context";
import { useNavigate } from "react-router-dom";
import { useNewProgramMutation } from "services/aws/programs";
import List from "./List";

export default function Programs() {
  const { id } = useAdminContext();
  const navigate = useNavigate();
  const { handleError } = useErrorContext();
  const [createProgram, { isLoading }] = useNewProgramMutation();

  async function handleCreateProgram() {
    try {
      const result = await createProgram({
        title: "New program",
        description: "program description",
        endowId: id,
        milestones: [],
      }).unwrap();
      navigate(`../${adminRoutes.program_editor}/${result.id}`);
    } catch (err) {
      handleError(err, { context: "creating program" });
    }
  }

  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">Programs</h2>
        <button
          disabled={isLoading}
          type="button"
          onClick={handleCreateProgram}
          className="btn-blue px-8 py-2"
        >
          {isLoading ? "Creating..." : "Create Program"}
        </button>
      </div>
      <List />
    </div>
  );
}
