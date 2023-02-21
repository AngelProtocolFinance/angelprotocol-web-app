import QueryLoader from "@ap/components/query-loader";
import { Selector } from "@ap/components/selector";
import { useTokensQuery } from "@ap/services/apes";
import { FormValues } from "../schema";

export default function DenomSelector() {
  const queryState = useTokensQuery({});

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Getting tokens...",
        error: "Failed to get tokens",
      }}
      classes={{ container: "my-2" }}
      filterFn={(token) => token.approved}
    >
      {(tokens) => (
        <Selector<FormValues, "availableCurrencies", string, true>
          name="availableCurrencies"
          options={tokens.map((token) => ({
            label: token.symbol,
            value: token.symbol,
          }))}
          classes={{ container: "bg-white dark:bg-blue-d6" }}
          multiple
        />
      )}
    </QueryLoader>
  );
}
