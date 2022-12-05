import { Link } from "react-router-dom";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import { AdminLink } from "components/admin";
import Logo from "./Logo";

export default function MyEndowment() {
  return (
    <div className="grid p-4 gap-3 border-b border-gray-l2 dark:border-bluegray">
      <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
        My Endowment
      </h3>
      <div className="flex gap-3">
        {/* Will be added once possible to fetch endowment profile by wallet address */}
        <Logo src={""} className="w-10 h-10" />
        <div className="grid">
          <span className="font-heading font-semibold text-sm">
            {/* Will be added once possible to fetch endowment profile by wallet address */}
            {"endowment name"}
          </span>
          <div className="flex items-center uppercase font-heading font-semibold text-xs underline underline-offset-2 decoration-1 text-orange">
            {/* Will be added once possible to fetch endowment profile by wallet address */}
            <Link to={""} className="pr-2">
              profile
            </Link>
            <AdminLink
              label="admin"
              className="px-2 border-l border-gray-l2 dark:border-bluegray"
              id={AP_ID}
            />
            <AdminLink
              label="applications"
              className="pl-2 border-l border-gray-l2 dark:border-bluegray"
              id={REVIEWER_ID}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
