import type { Program as TProgram } from "@better-giving/endowment";
import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { adminRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useAdminContext } from "pages/Admin/Context";
import { Link } from "react-router-dom";
import { useDeleteProgramMutation } from "services/aws/programs";
import type { ProgramDeleteMsg } from "services/types";

export function Program(props: TProgram) {
  const { id } = useAdminContext();
  const { handleError } = useErrorContext();
  const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();

  const handleDeleteProgram = async (msg: ProgramDeleteMsg) => {
    try {
      await deleteProgram(msg);
    } catch (err) {
      handleError(err, { context: "deleting program" });
    }
  };

  return (
    <div
      className={`p-6 border border-gray-l4 rounded ${
        isDeleting ? "bg-gray-l4" : "bg-gray-l6"
      } grid @lg:flex items-center gap-x-4 gap-y-8`}
    >
      <div className="flex items-center gap-x-4 @lg:contents">
        <Image
          src={props.banner}
          alt="program banner"
          className="w-10 aspect-square object-cover"
        />
        <p className="font-bold">{props.title}</p>
      </div>

      {isDeleting ? (
        <LoaderRing thickness={10} classes="@lg:ml-auto w-6" />
      ) : (
        <div className="flex items-center gap-x-4 @lg:contents">
          <button
            className="btn-outline-filled w-24 py-2 text-sm @lg:ml-auto"
            type="button"
            onClick={() => {
              const ok = window.confirm(
                "Are you sure you want to delete this program?"
              );
              if (!ok) return;
              handleDeleteProgram({
                id,
                program_id: props.id,
              });
            }}
          >
            delete
          </button>
          <Link
            to={`../${adminRoutes.program_editor}/${props.id}`}
            className="btn-outline-filled w-24 py-2 text-sm"
            state={props}
          >
            edit
          </Link>
        </div>
      )}
    </div>
  );
}
