import { useAdminResources } from "pages/Admin/Guard";
import { useDonationsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import { PAYMENT_WORDS } from "constants/env";
import Table from "./Table";

export default function DonationsTable({ classes = "" }) {
  const { id } = useAdminResources();
  const { data, ...rest } = useDonationsQuery({
    id: id.toString(),
    chain_id: "80001",
  });

  return (
    <div className={classes}>
      <QueryLoader
        queryState={{ data: data?.Items, ...rest }}
        messages={{
          loading: `Fetching ${PAYMENT_WORDS.noun.plural}..`,
          error: `Failed to get ${PAYMENT_WORDS.noun.plural}`,
          empty: `No ${PAYMENT_WORDS.noun.plural} found`,
        }}
      >
        {(donations) => <Table donations={donations} />}
      </QueryLoader>
    </div>
  );
}
