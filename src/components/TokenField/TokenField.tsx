import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { OnSetAmount, Props } from "./types";
import { TokenWithAmount } from "types/slices";
import Balance from "./Balance";
import Steps from "./Steps";
import TokenSelector from "./TokenSelector";

const amountKey: keyof TokenWithAmount = "amount";
type BaseFormValue = { [index: string]: TokenWithAmount };

export default function TokenField<T extends FieldValues, K extends Path<T>>({
  label,
  tokens,
  name,
  withGiftcard,
  scale,
  classes,
}: Props<T, K>) {
  const {
    register,
    setValue,
    resetField,
    formState: { errors },
  } = useFormContext<T>();
  const {
    field: { onChange, value: token },
  } = useController<BaseFormValue>({
    name: name,
  });

  const amountField: any = `${name}.${amountKey}`;

  //reset amount when changing token
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
          className="text-lg font-bold mr-auto max-sm:mb-2"
        >
          {label}
        </label>
        <Balance
          token={token}
          onSetAmount={onSetAmount}
          isGiftEnabled={!!withGiftcard}
        />
      </div>

      <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 px-4 dark:bg-blue-d6 field-container">
        <input
          {...register(amountField)}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0.0000"
          className="text-sm py-3 dark:text-gray"
        />
        <TokenSelector tokens={tokens} token={token} onChange={onChange} />
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
      <p className="text-xs mb-3">
        Minimal amount: {token.symbol} {token.min_donation_amnt}
      </p>
      {scale && <Steps scale={scale} token={token} onSetAmount={onSetAmount} />}
    </div>
  );
}
