import { humanize } from "helpers";
import { useUsdRateQuery } from "services/coingecko";

export const token = (coinGeckoId: string) =>
  function Amount(props: { amount: string | number; classes?: string }) {
    const { data: rate, isLoading, isError } = useUsdRateQuery(coinGeckoId);
    return (
      <dd className={props.classes}>
        {humanize(props.amount, 4)}{" "}
        {isLoading ? (
          "($--)"
        ) : isError || !rate ? (
          <span className="text-red">"($--)"</span>
        ) : (
          `($${humanize(+props.amount * rate, 2)})`
        )}
      </dd>
    );
  };
