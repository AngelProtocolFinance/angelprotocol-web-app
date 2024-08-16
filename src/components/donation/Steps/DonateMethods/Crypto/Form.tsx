import TokenField from "../../../../TokenField";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { ProgramSelector } from "../../common/ProgramSelector";
import type { CryptoFormStep } from "../../types";
import { nextFormState } from "../helpers";
import type { DonateValues } from "./types";
import { useRhf } from "./useRhf";

export default function Form(props: CryptoFormStep) {
  const { setState } = useDonationState();

  const { handleSubmit, reset, program, token, errors } = useRhf(props);

  function submit({ chainId, ...data }: DonateValues) {
    if (!chainId) throw "dev: chainId should be validated";
    setState((prev) => nextFormState(prev, { ...data, method: "crypto" }));
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 rounded-md min-h-full"
      autoComplete="off"
    >
      <TokenField
        ref={token.ref}
        token={token.value}
        onChange={token.onChange}
        error={errors.token}
        withBalance
        label="Donation amount"
        classes={{
          label: "font-heading mb-1",
          inputContainer: "field-container-donate pr-5",
        }}
        withMininum
      />

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        <ProgramSelector
          classes="my-2"
          endowId={props.init.recipient.id}
          program={program.value}
          onChange={program.onChange}
        />
      )}

      <ContinueBtn className="mt-auto" type="submit" />
    </form>
  );
}
