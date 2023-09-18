import { useTokensQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import { MultiSelector } from "components/Selector";
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
        <MultiSelector<FormValues, "availableCurrencies", string>
          name="availableCurrencies"
          options={tokens.map((token) => ({
            label: token.symbol,
            value: token.symbol,
          }))}
          classes={{ container: "bg-white dark:bg-blue-d6" }}
        />
      )}
    </QueryLoader>
  );
}
