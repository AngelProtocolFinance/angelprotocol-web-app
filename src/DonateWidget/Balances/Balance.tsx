import { BalanceInfo, EndowmentBalance } from "types/contracts";
import { QueryLoader } from "components/admin";
import { condense, humanize } from "helpers";

const CONTAINER_STYLE =
  "flex flex-col justify-center items-center sm:items-start gap-2 w-60 sm:w-full h-20 p-4 rounded border border-gray-l2 bg-orange-l6";

export default function Balance(props: {
  queryState: { data?: EndowmentBalance; isLoading: boolean; isError: boolean };
  title: string;
  getAmount: (balance: BalanceInfo) => number;
}) {
  return (
    <QueryLoader
      queryState={props.queryState}
      messages={{
        loading: `Fetching ${props.title.toLowerCase()}`,
        error: `Failed to get ${props.title.toLowerCase()}`,
      }}
      classes={{ container: CONTAINER_STYLE }}
    >
      {({ tokens_on_hand }) => (
        <div className={CONTAINER_STYLE}>
          <h6 className="font-heading font-bold text-3xs tracking-wider uppercase">
            {props.title}
          </h6>
          <p className="font-work font-normal text-sm text-gray-d1 dark:text-gray">
            ${humanize(condense(props.getAmount(tokens_on_hand)))}
          </p>
        </div>
      )}
    </QueryLoader>
  );
}
