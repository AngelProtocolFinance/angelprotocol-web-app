import { Link } from "react-router-dom";
import { adminRoutes } from "constants/routes";

export default function Programs() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">Programs</h2>
        <Link
          to={`../${adminRoutes.create_program}`}
          className="btn-orange px-8 py-2"
        >
          Create program
        </Link>
      </div>
    </div>
  );
}
