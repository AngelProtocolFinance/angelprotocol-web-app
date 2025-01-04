import { Link, Outlet } from "@remix-run/react";
import Breadcrumbs from "components/Breadcrumbs";
import { appRoutes } from "constants/routes";
import { Plus } from "lucide-react";
import { useAdminContext } from "../../../Context";
import { List } from "./List";

export default function Videos() {
  const { id } = useAdminContext();
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
        <Link to="new" className="btn-outline-filled text-sm px-8 py-2 gap-1">
          <Plus size={16} />
          <span>add video</span>
        </Link>
      </div>
      <List classes="mt-6" />
      <Outlet data-video-editor />
    </div>
  );
}
