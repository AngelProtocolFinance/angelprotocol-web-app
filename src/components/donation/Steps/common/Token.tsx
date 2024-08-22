import { humanize } from "helpers";
import { useTokenEstimateQuery } from "services/aws/crypto";

export const token = (tokenCode: string) =>
  function Amount(props: { amount: string | number; classes?: string }) {
    const {
      data: estimate,
      isLoading,
      isError,
    } = useTokenEstimateQuery(tokenCode);
    return (
      <dd className={props.classes}>
        {humanize(props.amount, 4)}{" "}
        {isLoading ? (
          "($--)"
        ) : isError || !estimate ? (
          <span className="text-red">($--)</span>
        ) : (
          `($${humanize(
            +props.amount * (estimate.fiat_equivalent / estimate.min_amount),
            2
          )})`
        )}
      </dd>
    );
  };
