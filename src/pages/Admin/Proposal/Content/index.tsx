import { useState } from "react";
import { Transaction } from "types/contracts/evm/multisig";
import Icon from "components/Icon";
import { DetailLabel } from "components/admin";
import Preview from "./Preview";

export default function Content(props: Transaction) {
  const [isRawBlocksShown, setIsRawBlockShown] = useState(false);

  function toggleRawMessage() {
    setIsRawBlockShown((prev) => !prev);
  }

  return (
    //follow Proposal layout
    <>
      {props.meta && (
        <>
          <DetailLabel classes="mb-2">content</DetailLabel>
          <Preview {...JSON.parse(props.meta)} />
        </>
      )}

      <DetailLabel classes="mt-4 mb-2">
        raw messages
        <button
          onClick={toggleRawMessage}
          className={`text-3xs ml-2 p-1 rounded-sm transition transform text-white ${
            isRawBlocksShown ? "bg-orange -rotate-90" : "bg-blue rotate-0"
          }`}
        >
          <Icon type="CaretLeft" />
        </button>
      </DetailLabel>
    </>
  );
}
