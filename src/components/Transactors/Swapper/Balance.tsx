import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { Token } from "types/aws";
import { humanize } from "helpers";

export default function Balance({ token }: { token: Token }) {
  const { setValue } = useFormContext<SwapValues>();

  function setAmount() {
    setValue("amount", `${token.balance}`, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <p className="ml-auto mr-1 text-xs font-light font-heading flex items-baseline text-gray-d2">
      <span className="mr-1 text-3xs font-semibold uppercase">balance</span>
      <button
        type="button"
        onClick={setAmount}
        className="inline hover:text-blue"
      >
        {humanize(token.balance, 3, true)} {token.symbol}
      </button>
    </p>
  );
}
