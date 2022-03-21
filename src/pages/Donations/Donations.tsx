import { useParams } from "react-router-dom";
import { useDonationTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import DonationsTable from "./DonationsTable";

export default function Donations() {
  const { address } = useParams<{ address: string }>();
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useDonationTransactionsQuery(address!, {
    skip: !address,
  });
  return (
    <div className="grid content-start padded-container pb-2">
      <h1 className="text-2xl font-bold uppercase text-white mt-2 mb-4">
        My Donations
      </h1>
      <DonationsTable
        transactions={data}
        isLoading={isLoading || isFetching}
        isError={isError}
      />
    </div>
  );
}
