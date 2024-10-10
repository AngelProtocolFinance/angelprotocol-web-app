import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { adminRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { toWithState } from "helpers/state-params";
import { useAdminContext } from "pages/Admin/Context";
import { Link } from "react-router-dom";
import { useDeleteProgramMutation } from "services/aws/programs";
import type { ProgramDeleteMsg } from "services/types";
import type { Program as TProgram } from "types/aws";

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
            onClick={() =>
              handleDeleteProgram({
                id,
                program_id: props.id,
              })
            }
          >
            delete
          </button>
          <Link
            to={toWithState(
              `../${adminRoutes.program_editor}/${props.id}`,
              props
            )}
            className="btn-outline-filled w-24 py-2 text-sm"
          >
            edit
          </Link>
        </div>
      )}
    </div>
  );
}
