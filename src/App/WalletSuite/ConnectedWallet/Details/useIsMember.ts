import { AP_ID, REVIEWER_ID, useIsMemberQuery } from "services/juno/custom";
import { ConnectedWallet } from "contexts/Wallet";
import { chainIds } from "constants/chainIds";

export default function useIsMember(wallet: ConnectedWallet) {
  const {
    data: isApMember = false,
    isLoading: isApLoading,
    isFetching: isApFetching,
  } = useIsMemberQuery(
    { user: wallet?.address!, endowmentId: `${AP_ID}` },
    { skip: wallet.chainId !== chainIds.juno }
  );
  const {
    data: isReviewMember = false,
    isLoading: isReviewLoading,
    isFetching: isReviewFetching,
  } = useIsMemberQuery(
    { user: wallet?.address!, endowmentId: `${REVIEWER_ID}` },
    { skip: wallet.chainId !== chainIds.juno }
  );

  return {
    isApMember,
    isReviewMember,
    isLoading:
      isApLoading || isApFetching || isReviewLoading || isReviewFetching,
  };
}
