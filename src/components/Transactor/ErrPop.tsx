import { ErrorStage } from "slices/transaction/types";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { getTxUrl } from "helpers";

export default function ErrPop(props: ErrorStage) {
  const { message, tx } = props;

  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-[15rem] content-center place-items-center">
      <Icon type="Info" className="text-angel-grey text-2xl mb-2" />
      <p className="text-center text-gray-d2 mb-2 ">{message}</p>
      {tx && (
        <ExtLink
          href={getTxUrl(tx.chainID, tx.hash)}
          className="text-center text-red-l1 cursor-pointer mb-6 text-sm"
        >
          view transaction details
        </ExtLink>
      )}
    </div>
  );
}
