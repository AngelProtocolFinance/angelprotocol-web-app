import { memo } from "react";
import TokenSelector from "./TokenSelector";

function Token() {
  return (
    <div className="w-115 flex items-center box-border border-l pl-1">
      <TokenSelector />
    </div>
  );
}

export default memo(Token);
