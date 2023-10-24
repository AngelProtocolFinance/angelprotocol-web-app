import { ErrorMessage } from "@hookform/error-message";
import {
  FieldValues,
  Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import { Props } from "./types";
import { TokenWithAmount } from "types/tx";
import TokenSelector from "./TokenSelector";

const amountKey: keyof TokenWithAmount = "amount";
type BaseFormValue = { [index: string]: TokenWithAmount };

export default function TokenField<T extends FieldValues, K extends Path<T>>({
  label,
  name,
  classes,
  disabled,
  selectedChainId,

  //flags
  withMininum,
}: Props<T, K>) {
  const {
    register,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useFormContext<T>();
  const {
    field: { onChange, value: token },
  } = useController<BaseFormValue>({
    name: name,
  });

  const amountField: any = `${name}.${amountKey}`;

  return (
    <div className={`grid ${classes?.container ?? ""}`}>
      <div className="flex max-sm:flex-col max-sm:items-start items-center mb-1">
        <label
          htmlFor="amount"
          className={`font-bold mr-auto max-sm:mb-2 ${classes?.label ?? ""}`}
        >
          {label}
        </label>
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
          selectedToken={token}
          onChange={(token) => {
            isDirty && setValue(amountField, "0" as any);
            onChange(token);
          }}
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
    </div>
  );
}
