import { FilterFormValues as FV } from "./types";
import { useCurrenciesQuery } from "services/apes";
import { Selector } from "components/Selector";

export default function CurrencyDropdown() {
  const { data: currencies = [] } = useCurrenciesQuery();

  return (
    <Selector<FV, "currency", string, false>
      name="currency"
      options={currencies.map((c) => ({ label: c.symbol, value: c.symbol }))}
    />
  );
}
