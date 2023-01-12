import LoaderRing from "components/LoaderRing";
import { Selector } from "components/Selector";
import { FormValues } from "./schema";
import useApprovedTokens from "./useApprovedTokens";

export default function DenomSelector() {
  const { approvedTokens, isLoading } = useApprovedTokens();

  if (isLoading) {
    return <LoaderRing thickness={10} classes="w-12" />;
  }

  return (
    <Selector<FormValues, "availableCurrencies", string, true>
      name="availableCurrencies"
      options={approvedTokens.map((token) => ({
        label: token,
        value: token,
      }))}
      classes={{ container: "bg-white dark:bg-blue-d6" }}
      multiple
    />
  );
}
