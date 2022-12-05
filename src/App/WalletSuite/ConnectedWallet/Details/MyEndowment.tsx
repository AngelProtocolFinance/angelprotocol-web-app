import { Link } from "react-router-dom";
import { AP_ID, REVIEWER_ID, useIsMemberQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext";
import ContentLoader from "components/ContentLoader";
import { chainIds } from "constants/chainIds";
import { appRoutes } from "constants/routes";
import Logo from "./Logo";

export default function MyEndowment() {
  const { isApMember, isReviewMember, isLoading } = useIsMember();

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
            {isLoading && <ContentLoader className="w-full h-5" />}
            {!isLoading && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function useIsMember() {
  const { wallet } = useGetWallet();
  const {
    data: isApMember = false,
    isLoading: isApLoading,
    isFetching: isApFetching,
  } = useIsMemberQuery(
    { user: wallet?.address!, endowmentId: `${AP_ID}` },
    { skip: !wallet || wallet.chain.chain_id !== chainIds.juno }
  );
  const {
    data: isReviewMember = false,
    isLoading: isReviewLoading,
    isFetching: isReviewFetching,
  } = useIsMemberQuery(
    { user: wallet?.address!, endowmentId: `${REVIEWER_ID}` },
    { skip: !wallet || wallet.chain.chain_id !== chainIds.juno }
  );

  return {
    isApMember,
    isReviewMember,
    isLoading:
      isApLoading || isApFetching || isReviewLoading || isReviewFetching,
  };
}
