import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import {
  FieldValues,
  Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import { OnSetAmount, Props } from "./types";
import { TokenWithAmount } from "types/tx";
import { humanize } from "helpers";
import Steps from "./Steps";
import TokenSelector from "./TokenSelector";

const amountKey: keyof TokenWithAmount = "amount";
type BaseFormValue = { [index: string]: TokenWithAmount };

export default function TokenField<T extends FieldValues, K extends Path<T>>({
  label,
  name,
  classes,
  scale,
  disabled,
  userWalletAddress,
  selectedChainId,

  //flags
  withBalance,
  witMininum,
}: Props<T, K>) {
  const {
    register,
    setValue,
    resetField,
    formState: { errors, isSubmitting },
  } = useFormContext<T>();
  const {
    field: { onChange, value: token },
  } = useController<BaseFormValue>({
    name: name,
  });

  const amountField: any = `${name}.${amountKey}`;

  useEffect(() => {
    resetField(amountField);
  }, [token.token_id, amountField, resetField]);

  const onSetAmount: OnSetAmount = (balance) =>
    setValue(amountField, balance as any, {
      shouldValidate: true,
      shouldDirty: true,
    });

  return (
    <div className={`grid ${classes?.container ?? ""}`}>
      <div className="flex max-sm:flex-col max-sm:items-start items-center mb-1">
        <label
          htmlFor="amount"
          className={`font-bold mr-auto max-sm:mb-2 ${classes?.label ?? ""}`}
        >
          {label}
        </label>
        {withBalance && (
          <button
            type="button"
            onClick={() => onSetAmount(token.balance)}
            className="text-right hover:text-blue text-xs flex"
          >
            BAL: {humanize(+token.balance, 3)} {token.symbol}
          </button>
        )}
      </div>

      <div
        aria-invalid={!!get(errors[name], "amount")?.message}
        aria-disabled={isSubmitting || disabled}
        className={`${
          classes?.inputContainer ?? ""
        } relative grid grid-cols-[1fr_auto] items-center gap-2 px-4 field-container`}
      >
        <input
          {...register(amountField)}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0.0000"
          className="text-sm py-3 dark:text-gray"
        />
        <TokenSelector
          selectedChainId={selectedChainId}
          userWalletAddress={userWalletAddress}
          selectedToken={token}
          onChange={onChange}
        />
      </div>
      <div className="empty:mb-2">
        <ErrorMessage
          data-error
          errors={errors}
          name={amountField}
          as="p"
          className="static field-error text-left my-1"
        />
      </div>
      {withMininum && (
        <p className="text-xs mb-3">
          Minimal amount: {token.symbol} {token.min_donation_amnt}
        </p>
      )}
      {scale && <Steps scale={scale} token={token} onSetAmount={onSetAmount} />}
    </div>
  );
}
