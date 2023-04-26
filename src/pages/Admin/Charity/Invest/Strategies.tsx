import { TStrategy } from "types/aws";
import { useStrategyCardsQuery } from "services/aws/aws";
import { ErrorStatus, LoadingStatus } from "components/Status";
import Strategy from "./Strategy";

export default function Strategies() {
  const { data, isLoading, isError } = useStrategyCardsQuery({});

  if (isLoading) return <LoadingStatus> Loading Strategies ...</LoadingStatus>;
  if (isError) return <ErrorStatus> Error Fetching Strategies</ErrorStatus>;

  return (
    <div>
      <h3 className="font-bold text-2xl my-8 text-center @lg:text-left">
        Featured Strategies
      </h3>
      <div className="grid gap-3">
        {data
          ? data.map((strategy: TStrategy, idx: number) => (
              <Strategy key={idx} {...strategy} />
            ))
          : "No Strategies Found"}
      </div>
    </div>
  );
}
