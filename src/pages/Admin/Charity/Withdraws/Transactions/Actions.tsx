import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { adminRoutes } from "constants/routes";

export default function Actions({ proposalId }: { proposalId: number }) {
  return (
    <Link
      title="View Proposal"
      className="flex justify-center items-center hover:text-orange active:text-orange-d1"
      to={`../${adminRoutes.proposal}/${proposalId}`}
    >
      <Icon type="FileSearch" className="w-6 h-6" />
    </Link>
  );
}
