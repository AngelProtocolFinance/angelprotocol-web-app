import { WithdrawLog } from "types/aws";
// import { useAdminResources } from "pages/Admin/Guard";
// import { useWithdrawLogsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import { chainIds } from "constants/chainIds";
import List from "./List";
import Table from "./Table";

const data: WithdrawLog[] = [
  {
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
];
export default function Transactions() {
  // const { cw3 } = useAdminResources();
  // const queryState = useWithdrawLogsQuery(cw3);
  return (
    <QueryLoader
      // queryState={queryState}
      queryState={{ isLoading: false, isError: false, data }}
      messages={{
        loading: "Loading transactions...",
        error: "Failed to get transactions",
        empty: "No transactions found",
      }}
    >
      {(logs) => (
        <>
          <List withdraws={logs} classes="grid md:hidden" />
          <Table withdraws={logs} classes="hidden md:table" />
        </>
      )}
    </QueryLoader>
  );
  // return <Table withdraws={logs} classes="hidden md:table" />;
}
