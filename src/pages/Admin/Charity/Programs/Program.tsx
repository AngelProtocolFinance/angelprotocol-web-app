import Image from "components/Image";
import { TxPrompt } from "components/Prompt";
import { adminRoutes } from "constants/routes";
import { useModalContext } from "contexts/ModalContext";
import { logger } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
import { Link } from "react-router-dom";
import { ProgramDeleteMsg } from "services/types";
import { Program as TProgram } from "types/aws";
import { useUpdateEndowmentProfile } from "../common";

export function Program(props: TProgram) {
  const { id } = useAdminContext();
  const { showModal } = useModalContext();
  const updateProfile = useUpdateEndowmentProfile();

  const deleteProgram = async (msg: ProgramDeleteMsg) => {
    try {
      await updateProfile(msg);
    } catch (err) {
      logger.error(err);
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return (
    <div className="p-6 border border-gray-l4 rounded bg-gray-l6 dark:bg-blue-d5 grid @lg:flex items-center gap-x-4 gap-y-8">
      <div className="flex items-center gap-x-4 @lg:contents">
        <Image
          src={props.program_banner}
          alt="program banner"
          className="w-10 aspect-square object-cover"
        />
        <p className="font-bold">{props.program_title}</p>
      </div>

      <div className="flex items-center gap-x-4 @lg:contents">
        <button
          className="btn-outline-filled w-24 py-2 text-sm @lg:ml-auto"
          type="button"
          onClick={() =>
            deleteProgram({
              id,
              program_id: props.program_id,
            })
          }
        >
          delete
        </button>
        <Link
          to={"../" + adminRoutes.program_editor + `/${props.program_id}`}
          className="btn-outline-filled w-24 py-2 text-sm"
          state={props}
        >
          edit
        </Link>
      </div>
    </div>
  );
}
