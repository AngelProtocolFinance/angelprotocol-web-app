import { ErrorMessage } from "@hookform/error-message";
import {
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from "react-hook-form";
import type { TokenOption } from "types/tx";
import { unpack } from "../form/helpers";
import TokenSelector from "./TokenSelector";
import type { Props } from "./types";

const amountKey: keyof TokenOption = "amount";
const tokenIDkey: keyof TokenOption = "token_id";
type BaseFormValue = { [index: string]: TokenOption };

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
          {...register(amountField)}
          disabled={disabled || isSubmitting}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="Enter amount"
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
