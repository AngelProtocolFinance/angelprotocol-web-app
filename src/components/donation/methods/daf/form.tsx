import { Form as FormContainer } from "components/form";
import { MaskedInput } from "components/form";
import { dollar } from "components/form/masks";
import { usd_option } from "../../common/constants";
import { Incrementers } from "../../common/incrementers";
import { use_donation_state } from "../../context";
import { use_rhf } from "./use-rhf";
import { to_checkout, type TMethodState } from "components/donation/types";

export function Form(props: TMethodState<"daf">) {
  const { set_state, state } = use_donation_state();
  const rhf = use_rhf(props.fv);

  return (
    <FormContainer
      disabled={rhf.isSubmitting}
      onSubmit={rhf.handleSubmit((fv) => to_checkout("daf", fv, set_state))}
      className="flex flex-col min-h-full"
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
          container: "mt-1",
        }}
        required
        error={rhf.errors.amount?.message}
      />

      <Incrementers
        on_increment={rhf.on_increment}
        code={usd_option.code}
        rate={usd_option.rate}
        increments={state.init.config?.increments}
        classes="mb-4 mt-1"
        precision={0}
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
