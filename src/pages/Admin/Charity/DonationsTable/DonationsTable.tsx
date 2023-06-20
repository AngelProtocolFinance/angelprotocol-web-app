import { useDonationsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import { chainIds } from "constants/chainIds";
import { PAYMENT_WORDS } from "constants/common";
import { useAdminResources } from "../../Context";
import Table from "./Table";

export default function DonationsTable({ classes = "" }) {
  const { id } = useAdminResources();
  const { data, ...rest } = useDonationsQuery({
    id: id.toString(),
    chain_id: chainIds.polygon,
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
