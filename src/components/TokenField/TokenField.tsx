import { ErrorMessage } from "@hookform/error-message";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { TokenWithAmount } from "types/tx";
import TokenSelector from "./TokenSelector";
import { Props } from "./types";

const amountKey: keyof TokenWithAmount = "amount";
const tokenIDkey: keyof TokenWithAmount = "token_id";
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
    getValues,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<T>();
  const {
    field: { onChange, value: token },
  } = useController<BaseFormValue>({
    name: name,
  });

  const amountField: any = `${name}.${amountKey}`;
  const tokenIDField: any = `${name}.${tokenIDkey}`;

  return (
    <div className={`grid ${classes?.container ?? ""}`}>
      <div className="flex max-sm:flex-col max-sm:items-start items-center mb-1">
        <label
          htmlFor="amount"
          className={`font-semibold mr-auto max-sm:mb-2 after:content-['_*'] after:text-red ${
            classes?.label ?? ""
          }`}
        >
          {label}
        </label>
      </div>

      <div
        className={`${
          classes?.inputContainer ?? ""
        } relative grid grid-cols-[1fr_auto] items-center gap-2 px-4 field-container peer`}
      >
        <input
          {...register(amountField)}
          disabled={disabled || isSubmitting}
          autoComplete="off"
          id="amount"
          type="text"
          className="text-sm py-3.5 dark:text-navy-l2"
        />
        <TokenSelector
          selectedChainId={selectedChainId}
          selectedToken={token}
          onChange={(token) => {
            //preserve previously provided amount
            onChange({ ...token, [amountKey]: getValues(amountField) });
          }}
        />
        <ErrorMessage
          data-error
          errors={errors}
          name={amountField}
          as="p"
          className="field-error left-0 text-left"
        />
        <ErrorMessage
          data-error
          errors={errors}
          name={tokenIDField}
          as="p"
          className="field-error"
        />
      </div>
      {withMininum && token.min_donation_amnt !== 0 && (
        <p className="text-xs mt-2 peer-has-[[data-error]]:mt-5">
          Minimal amount: {token.symbol} {token.min_donation_amnt}
        </p>
      )}
    </div>
  );
}
