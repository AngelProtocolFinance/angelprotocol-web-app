import { unpack } from "helpers";
import { forwardRef } from "react";
import TokenSelector from "./TokenSelector";
import type { Props } from "./types";

const TokenField: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    label,
    classes,
    disabled,
    chainId,
    token,
    onChange,
    error,
    //flags
    withMininum,
  },
  ref
) => {
  const style = unpack(classes);

  return (
    <div className={`grid ${style.container}`}>
      <label
        htmlFor="amount"
        className={`font-semibold mr-auto mb-2 after:content-['_*'] after:text-red ${style.label}`}
      >
        {label}
      </label>

      <div
        className={`${style.inputContainer} relative grid grid-cols-[1fr_auto] items-center gap-2 field-container peer`}
      >
        <input
          ref={ref}
          value={token.amount}
          onChange={(e) => onChange({ ...token, amount: e.target.value })}
          disabled={disabled}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="Enter amount"
          className="text-sm py-3.5 dark:text-navy-l2"
        />
        <TokenSelector chainId={chainId} token={token} onChange={onChange} />
        {error && (
          <p data-error className="field-error left-0 text-left">
            {error}
          </p>
        )}
      </div>
      {withMininum && token.min_donation_amnt !== 0 && (
        <p className="text-xs mt-2 peer-has-[[data-error]]:mt-5">
          Minimal amount: {token.symbol} {token.min_donation_amnt}
        </p>
      )}
    </div>
  );
};

export default forwardRef(TokenField);
