import { WithdrawLog } from "types/aws";
import { useAdminResources } from "pages/Admin/Guard";
import {
  updateApesQueryData,
  useLazyWithdrawLogsQuery,
  useWithdrawLogsQuery,
} from "services/apes";
import { useSetter } from "store/accessors";
import { chainIds } from "constants/chainIds";

const DATA: { Items: WithdrawLog[]; ItemCutoff?: number } = {
  Items: [
    {
      start_time: new Date().toISOString(),
      amount: 800.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "open",
      symbol: "JUNO",
      target_chain: chainIds.juno,
      target_wallet: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdfa",
          output_amount: 800.2839,
          output_symbol: "JUNO",
          status: "OK",
        },
      ],
    },
    {
      start_time: new Date().toISOString(),
      amount: 800.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "executed",
      symbol: "JUNO",
      target_chain: chainIds.juno,
      target_wallet: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdfa",
          output_amount: 800.2839,
          output_symbol: "JUNO",
          status: "OK",
        },
      ],
    },
    {
      start_time: new Date().toISOString(),
      amount: 800.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "pending",
      symbol: "JUNO",
      target_chain: chainIds.juno,
      target_wallet: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdfa",
          output_amount: 800.2839,
          output_symbol: "JUNO",
          status: "OK",
        },
      ],
    },
    {
      start_time: new Date().toISOString(),
      amount: 800.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "rejected",
      symbol: "JUNO",
      target_chain: chainIds.juno,
      target_wallet: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdfa",
          output_amount: 800.2839,
          output_symbol: "JUNO",
          status: "OK",
        },
      ],
    },
    {
      start_time: new Date().toISOString(),
      amount: 300.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "passed",
      symbol: "ETH",
      target_chain: chainIds.ethereum,
      target_wallet: "0x0f6d331f26C0B64fc6EACddABd5645b55cf2d8e0",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdf2",
          output_amount: 300.2839,
          output_symbol: "ETH",
          status: "OK",
        },
      ],
    },
  ],
};
export default function useGetWithdrawLogs() {
  const dispatch = useSetter();
  const { cw3 } = useAdminResources();
  const queryState = useWithdrawLogsQuery({ cw3, sort: "default" });

  const { isLoading, isError, data, originalArgs } = queryState;

  const [loadMore, { isLoading: isLoadingNextPage, isError: isErrorNextPage }] =
    useLazyWithdrawLogsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.ItemCutoff &&
      originalArgs /** cards won't even show if no initial query is made */
    ) {
      const { data: newEndowRes } = await loadMore({
        ...originalArgs,
        start: data.ItemCutoff + 1,
      });

      if (newEndowRes) {
        //pessimistic update to original cache data
        dispatch(
          updateApesQueryData("withdrawLogs", originalArgs, (prevResult) => {
            prevResult.Items.push(...newEndowRes.Items);
            prevResult.ItemCutoff = newEndowRes.ItemCutoff;
          })
        );
      }
    }
  }

  const hasMore = !!data?.ItemCutoff;

  return {
    data: DATA,
    hasMore: false,
    isError: false,
    isLoading: false,
    // data,
    // hasMore,
    // isError: isError || isErrorNextPage,
    // isLoading,
    // loadNextPage,
    // isLoadingNextPage,
    isLoadingNextPage: false,
    loadNextPage: () => {},
  };
}
