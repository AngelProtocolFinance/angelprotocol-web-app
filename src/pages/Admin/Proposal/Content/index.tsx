import { useState } from "react";
import { Transaction } from "types/contracts/multisig";
import Icon from "components/Icon";
import { DetailLabel } from "components/admin";
import Preview from "./Preview";

export default function Content(props: Transaction) {
  const [dataShown, setDataShown] = useState(false);

  function toggleRawMessage() {
    setDataShown((prev) => !prev);
  }

  return (
    <>
      {props.meta && (
        <>
          <DetailLabel classes="mb-2">content</DetailLabel>
          <Preview {...JSON.parse(window.atob(props.meta))} />
        </>
      )}

      <DetailLabel classes="mt-4 mb-2">
        Transaction data
        <button
          onClick={toggleRawMessage}
          className={`text-3xs ml-2 p-1 rounded-sm transition transform text-white ${
            dataShown ? "bg-orange -rotate-90" : "bg-blue rotate-0"
          }`}
        >
          <Icon type="CaretLeft" />
        </button>
      </DetailLabel>
      {dataShown && (
        <div className="grid rounded text-gray-d1 dark:text-gray border border-prim bg-orange-l6 dark:bg-blue-d7 p-3 mb-6 text-sm">
          <code className="font-mono whitespace-pre overflow-x-auto">
            {props.data}
          </code>
        </div>
      )}
    </>
  );
}
