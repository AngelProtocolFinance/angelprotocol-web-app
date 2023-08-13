import { useTransactionsQuery } from "services/axelar";
import QueryLoader from "components/QueryLoader";

export default function Transactions() {
  const queryState = useTransactionsQuery({});
  return (
    <QueryLoader
      queryState={queryState}
      messages={{ loading: "Loading recent transactions" }}
    >
      {(transactions) => <span>{transactions[0].call.transactionHash}</span>}
    </QueryLoader>
  );
}
