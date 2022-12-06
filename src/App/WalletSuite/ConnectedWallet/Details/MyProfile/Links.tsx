import { Link } from "react-router-dom";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import ContentLoader from "components/ContentLoader";
import { appRoutes } from "constants/routes";
import useIsMember from "./useIsMember";

export default function Links() {
  const { isApMember, isReviewMember, isLoading } = useIsMember();

  if (isLoading) {
    return <ContentLoader className="w-full h-5" />;
  }

  return (
    <div className="flex items-center uppercase font-heading font-semibold text-xs underline underline-offset-2 decoration-1 text-orange">
      {/* Will be added once possible to fetch endowment profile by wallet address */}
      <Link to={""} className="pr-2">
        profile
      </Link>
      {isApMember && (
        <Link
          to={`${appRoutes.admin}/${AP_ID}`}
          className="px-2 border-l border-gray-l2 dark:border-bluegray"
        >
          admin
        </Link>
      )}
      {isReviewMember && (
        <Link
          to={`${appRoutes.admin}/${REVIEWER_ID}`}
          className="pl-2 border-l border-gray-l2 dark:border-bluegray"
        >
          applications
        </Link>
      )}
    </div>
  );
}
