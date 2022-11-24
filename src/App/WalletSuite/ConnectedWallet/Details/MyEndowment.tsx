import { useState } from "react";
import { Link } from "react-router-dom";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import ContentLoader from "components/ContentLoader";
import { AdminLink } from "components/admin";

// Placeholder until profile-fetching by wallet address endpoint is created
const profile = undefined;

export default function MyEndowment() {
  return (
    !profile && (
      <div className="grid p-4 gap-3 border-b border-gray-l2">
        <h3 className="font-heading font-bold text-sm text-gray-d1">
          My Endowment
        </h3>
        <div className="flex gap-3">
          {/* Will be added once possible to fetch endowment profile by wallet address */}
          <Logo logo={""} />
          <div className="grid">
            <span className="font-heading font-semibold text-sm">
              {/* Will be added once possible to fetch endowment profile by wallet address */}
              {"endowment name"}
            </span>
            <div className="flex items-center uppercase font-heading font-semibold text-xs underline text-orange">
              {/* Will be added once possible to fetch endowment profile by wallet address */}
              <Link to={""} className="pr-2 border-r border-gray-l2">
                profile
              </Link>
              <AdminLink
                label="admin"
                className="px-2 border-r border-gray-l2"
                id={AP_ID}
              />
              <AdminLink
                label="applications"
                className="pl-2"
                id={REVIEWER_ID}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function Logo({ logo }: { logo: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      {isLoading && <ContentLoader className="w-10 h-10 rounded-full" />}
      <img
        src={logo}
        className={`w-10 h-10 object-contain border border-gray-l2 rounded-full ${
          isLoading ? "hidden" : ""
        }`}
        alt=""
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
