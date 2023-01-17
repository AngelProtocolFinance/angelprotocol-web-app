import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { Token } from "types/aws";
import { useCurrenciesQuery } from "services/apes";
import { Selector, selectorButtonStyle } from "components/Selector";
import { QueryLoader } from "components/admin";
import { junoAddrPattern, terraAddrPattern } from "schemas/string";

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
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading currencies..",
        error: "Failed to get currency options",
        empty: "No tokens to select from",
      }}
      classes={{ container: selectorButtonStyle + " mx-6" }}
      filterFn={(token) => tokenTypes.includes(token.type)}
    >
      {(tokens) => (
        <div className={classes + " grid gap-2"}>
          <label className="text-sm">Currency</label>
          <Selector<FV, "currency", string, false>
            name="currency"
            classes={{ button: "dark:bg-blue-d6" }}
            options={tokens.map((c) => ({ label: c.symbol, value: c.symbol }))}
          />
        </div>
      )}
    </QueryLoader>
  );
}
