import { CpfToggle } from "components/donation/common/cpf-toggle";
import { type TMethodState, to_checkout } from "components/donation/types";
import { Form as FormContainer } from "components/form";
import { MaskedInput } from "components/form";
import { dollar } from "components/form/masks";
import { ru_vdec } from "helpers/decimal";
import { usd_option } from "../../common/constants";
import { Incrementers } from "../../common/incrementers";
import { TipField } from "../../common/tip-field";
import { use_donation } from "../../context";
import { use_rhf } from "./use-rhf";

export function Form(props: TMethodState<"daf">) {
  const { don_set, don } = use_donation();
  const rhf = use_rhf(props.fv, don.recipient.hide_bg_tip ?? false);

  return (
    <FormContainer
      disabled={rhf.isSubmitting}
      onSubmit={rhf.handleSubmit((fv) => to_checkout("daf", fv, don_set))}
      className="flex flex-col gap-y-2 min-h-full"
    >
      <MaskedInput
        id="donation-amount"
        inputMode="decimal"
        mask={dollar.opts}
        ref={rhf.amount.ref}
        value={rhf.amount.value ? dollar.mask(+rhf.amount.value) : ""}
        onChange={(x) => rhf.amount.onChange(dollar.unmask(x))}
        label="Donation amount"
        placeholder="$ Enter amount"
        classes={{
          label: " font-semibold",
          input: "field-input-donate",
        }}
        required
        error={rhf.errors.amount?.message}
      />

      <Incrementers
        on_increment={rhf.on_increment}
        code={usd_option.code}
        rate={usd_option.rate}
        increments={don.config?.increments}
        precision={0}
      />

      {don.recipient.hide_bg_tip ? null : (
        <TipField
          classes="mt-2"
          checked={rhf.tip_format.value !== "none"}
          checked_changed={(checked) => {
            if (checked) {
              rhf.tip_format.onChange("15");
            } else {
              rhf.tip_format.onChange("none");
              rhf.setValue("tip", "");
            }
          }}
          tip_format={rhf.tip_format.value}
          tip_format_changed={async (format) => {
            rhf.tip_format.onChange(format);
            if (format === "none") {
              return rhf.setValue("tip", "");
            }
            if (format === "custom") {
              await new Promise((r) => setTimeout(r, 50));
              return rhf.setFocus("tip");
            }

            const amnt = rhf.getValues("amount");
            if (!amnt) return rhf.setValue("tip", "");

            const v = (+format / 100) * +amnt;
            rhf.setValue("tip", ru_vdec(v, 1));
          }}
          custom_tip={
            rhf.tip_format.value === "custom" ? (
              <div className="relative w-full">
                <input
                  {...rhf.register("tip")}
                  type="number"
                  step="any"
                  className="w-full text-sm pl-2 focus:outline-none"
                  placeholder="Enter tip"
                  aria-invalid={!!rhf.errors.tip?.message}
                />
                <span className="right-6 text-xs text-red text-right absolute top-1/2 -translate-y-1/2 empty:hidden">
                  {rhf.errors.tip?.message}
                </span>
              </div>
            ) : undefined
          }
        />
      )}

      <CpfToggle
        checked={rhf.cpf.value}
        checked_changed={(x) => rhf.cpf.onChange(x)}
      />

      <button
        className="mt-auto btn btn-blue text-sm enabled:bg-(--accent-primary)"
        type="submit"
      >
        Continue
      </button>
    </FormContainer>
  );
}
