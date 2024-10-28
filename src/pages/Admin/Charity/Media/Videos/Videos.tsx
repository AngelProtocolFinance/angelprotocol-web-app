import Breadcrumbs from "components/Breadcrumbs";
import { appRoutes } from "constants/routes";
import { useModalContext } from "contexts/ModalContext";
import { Plus } from "lucide-react";
import { useAdminContext } from "../../../Context";
import VideoEditor from "../VideoEditor";
import { List } from "./List";

export default function Videos() {
  const { id } = useAdminContext();
  const { showModal } = useModalContext();
  return (
    <div className="grid content-start @container">
      <Breadcrumbs
        className="justify-self-start text-sm mb-4"
        items={[
          {
            title: "Media",
            to: `${appRoutes.admin}/${id}/media`,
            end: true,
          },
          {
            title: "Videos",
            to: ".",
          },
        ]}
      />
      <div className="flex justify-between items-center">
        <h4 className="text-2xl capitalize mt-4">All videos</h4>
        <button
          onClick={() => showModal(VideoEditor, {})}
          type="button"
          className="btn-outline-filled text-sm px-8 py-2 gap-1"
        >
          <Plus size={16} />
          <span>add video</span>
        </button>
      </div>
      <List endowId={id} classes="mt-6" />
    </div>
  );
}
