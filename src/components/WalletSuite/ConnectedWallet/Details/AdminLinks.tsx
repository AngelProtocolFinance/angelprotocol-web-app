import { Link } from "react-router-dom";
import { AP_ID, REVIEWER_ID } from "services/contract/custom/constants";
import useIsMemberQuery from "services/contract/custom/useIsMemberQuery";
import { WalletState } from "contexts/WalletContext";
import { appRoutes } from "constants/routes";

export default function AdminLinks(props: WalletState) {
  const {
    data: isApMember = false,
    isLoading: isApLoading,
    isValidating: isApFetching,
  } = useIsMemberQuery(props.address, AP_ID);
  const {
    data: isReviewMember = false,
    isLoading: isReviewLoading,
    isValidating: isReviewFetching,
  } = useIsMemberQuery(props.address, REVIEWER_ID);

  const isLoading =
    isApLoading || isApFetching || isReviewLoading || isReviewFetching;

  if (isLoading || !isApMember || !isReviewMember) return null;

  return (
    <div className="grid p-4 gap-3 border-b border-prim">
      <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
        Platform Administration
      </h3>
      <div className="flex items-center uppercase font-heading font-semibold text-xs underline underline-offset-2">
        {isApMember && (
          <Link
            to={`${appRoutes.admin}/${AP_ID}`}
            className="pr-2 text-orange hover:text-orange-l2 decoration-1 hover:decoration-2"
          >
            ap admin
          </Link>
        )}
        {isReviewMember && (
          <Link
            to={`${appRoutes.admin}/${REVIEWER_ID}`}
            className="pl-2 border-l border-prim text-orange hover:text-orange-l2 decoration-1 hover:decoration-2"
          >
            applications
          </Link>
        )}
      </div>
    </div>
  );
}
