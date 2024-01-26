import QueryLoader from "components/QueryLoader";
import { Selector, selectorButtonStyle } from "components/Selector";
import { useFormContext } from "react-hook-form";
import { junoAddrPattern, terraAddrPattern } from "schemas/string";
import { useCurrenciesQuery } from "services/apes";
import { Token } from "types/aws";
import { FormValues as FV } from "./types";

export default function CurrencyDropdown({ classes = "" }) {
  const { getValues } = useFormContext<FV>();

  const donor = getValues("donorAddress");
  const isJuno = junoAddrPattern.test(donor);
  const isTerra = terraAddrPattern.test(donor);
  const tokenTypes: Token["type"][] = isJuno
    ? ["juno-native", "ibc"]
    : isTerra
      ? ["terra-native", "ibc", "cw20"]
      : ["evm-native", "erc20"];

  const queryState = useCurrenciesQuery();

  return (
    <div className={`${classes} grid gap-2`}>
      <label className="text-sm">Currency</label>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading currencies..",
          error: "Failed to get currency options",
          empty: "No tokens to select from",
        }}
        classes={{
          container: `${selectorButtonStyle} bg-white dark:bg-blue-d6 px-4 py-3`,
        }}
        filterFn={(token) => tokenTypes.includes(token.type)}
      >
        {(tokens) => (
          <Selector<FV, "currency", string>
            name="currency"
            classes={{ button: "dark:bg-blue-d6" }}
            options={tokens.map((c) => ({ label: c.symbol, value: c.symbol }))}
          />
        )}
      </QueryLoader>
    </div>
  );
}
