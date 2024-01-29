import { adminRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import List from "./List";

export default function Programs() {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">Programs</h2>
        <Link
          to={`../${adminRoutes.program_editor}/new`}
          className="btn-orange px-8 py-2"
        >
          Create program
        </Link>
      </div>
      <List />
    </div>
  );
}
