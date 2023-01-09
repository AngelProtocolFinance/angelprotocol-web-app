import { AP_ID, REVIEWER_ID, useIsMemberQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext";
import { chainIds } from "constants/chainIds";

export default function useIsMember() {
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
