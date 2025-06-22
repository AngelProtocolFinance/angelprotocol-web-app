import CurrencySelector from "components/currency-selector";
import { Form as FormContainer } from "components/form";
import { MaskedInput, currency } from "components/form/masked-input";
import { usdOption } from "../../common/constants";
import ContinueBtn from "../../common/continue-btn";
import Incrementers from "../../common/incrementers";
import { ProgramSelector } from "../../common/program-selector";
import { useDonationState } from "../../context";
import { nextFormState } from "../helpers";
import type { Props } from "./types";
import { useRhf } from "./use-rhf";

export default function Form(props: Props) {
  const { setState } = useDonationState();
  const rhf = useRhf(props);

  return (
    <FormContainer
      disabled={rhf.isSubmitting}
      onSubmit={rhf.handleSubmit((fv) =>
        setState((prev) => nextFormState(prev, { ...fv, method: "daf" }))
      )}
      className="grid gap-4"
    >
      <CurrencySelector
        currencies={[usdOption]}
        label="Currency"
        // only one currency available, so can't change it
        onChange={() => {}}
        value={usdOption}
        classes={{
          label: "font-heading font-semibold text-base",
          input: "field-input-donate",
        }}
        required
      />
      <MaskedInput
        inputMode="decimal"
        mask={currency.opts}
        ref={rhf.amount.ref}
        value={currency.mask(rhf.amount.value)}
        onChange={(x) => rhf.amount.onChange(currency.unmask(x))}
        label="Donation amount"
        placeholder="Enter amount"
        classes={{
          label: "font-heading font-semibold text-base",
          input: "field-input-donate",
          container: "mt-1",
        }}
        required
        sub="The minimum donation amount will depend on your DAF provider."
        error={rhf.errors.amount?.message}
      />

      <Incrementers
        onIncrement={rhf.onIncrement}
        code={usdOption.code}
        rate={usdOption.rate}
        increments={props.init.config?.increments}
        classes="mb-4"
        precision={0}
      />

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        // program not allowed for fund (id string)
        <ProgramSelector
          endowId={+props.init.recipient.id}
          program={rhf.program.value}
          onChange={rhf.program.onChange}
        />
      )}

      <p className="text-sm text-gray-d4 dark:text-gray mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <ContinueBtn className="mt-2" type="submit" />
    </FormContainer>
  );
}
