import CurrencySelector from "components/CurrencySelector";
import { NativeField as Field, Form as FormContainer } from "components/form";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import Incrementers from "../../common/Incrementers";
import { ProgramSelector } from "../../common/ProgramSelector";
import { usdOption } from "../../common/constants";
import { nextFormState } from "../helpers";
import type { Props } from "./types";
import { useRhf } from "./useRhf";

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
          label: "font-semibold",
          combobox: "field-container-donate",
          container: "field-donate",
        }}
        required
      />
      <Field
        {...rhf.register("amount")}
        label="Donation amount"
        placeholder="Enter amount"
        classes={{ label: "font-semibold", container: "field-donate mt-1" }}
        required
        tooltip="The minimum donation amount will depend on your DAF provider."
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
        <ProgramSelector
          endowId={props.init.recipient.id}
          program={rhf.program.value}
          onChange={rhf.program.onChange}
        />
      )}

      <p className="text-sm text-navy-d4 dark:text-navy-l2 mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <ContinueBtn className="mt-2" type="submit" />
    </FormContainer>
  );
}
