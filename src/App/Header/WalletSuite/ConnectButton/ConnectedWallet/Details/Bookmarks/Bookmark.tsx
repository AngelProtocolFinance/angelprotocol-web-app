import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";
import { AdminLink } from "components/admin";
import { appRoutes } from "constants/routes";

export default function Bookmark({ name, id }: EndowmentBookmark) {
  return (
    <li className="grid justify-items-start font-heading">
      <p className="text-sm">{name}</p>
      <div className="flex items-center divide-x divide-angel-grey/20">
        <Link
          to={appRoutes.profile + "/" + id}
          className="text-xs uppercase text-angel-blue active:text-angel-orange pr-2"
        >
          Profile
        </Link>
        <AdminLink
          className="text-xs uppercase text-angel-blue active:text-angel-orange pl-2"
          id={id}
          label="admin"
        />
      </div>
    </li>
  );
}
