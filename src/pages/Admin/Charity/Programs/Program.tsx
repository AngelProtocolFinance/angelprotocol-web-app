import { adminRoutes } from "constant/routes";
import { Link } from "react-router-dom";
import { ProgramDeleteMsg } from "services/types";
import { Program as TProgram } from "types/aws";
import { useAdminContext } from "pages/Admin/Context";
import { useModalContext } from "contexts/ModalContext";
import Image from "components/Image";
import { TxPrompt } from "components/Prompt";
import useUpdateEndowmentProfile from "../common/useUpdateEndowmentProfile";
import { ops } from "./ops";

export function Program(props: TProgram) {
  const { id, owner } = useAdminContext<"charity">(ops);
  const { showModal } = useModalContext();
  const updateProfile = useUpdateEndowmentProfile();

  const deleteProgram = async (msg: ProgramDeleteMsg) => {
    try {
      await updateProfile(msg);
    } catch (err) {
      console.log(err);
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return (
    <div className="p-6 border border-prim rounded bg-gray-l6 dark:bg-blue-d5 grid @lg:flex items-center gap-x-4 gap-y-8">
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
            deleteProgram({ id, owner, program_id: props.program_id })
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
