import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { ProgramSelector } from "../../common/ProgramSelector";
import type { CryptoFormStep } from "../../types";
import { nextFormState } from "../helpers";
import { TokenSelector } from "./TokenSelector";
import type { DonateValues } from "./types";
import { useRhf } from "./useRhf";

export default function Form(props: CryptoFormStep) {
  const { setState } = useDonationState();

  const { handleSubmit, reset, program, token, errors } = useRhf(props);

  function submit(fv: DonateValues) {
    setState((prev) => nextFormState(prev, { ...fv, method: "crypto" }));
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 rounded-md min-h-full"
      autoComplete="off"
    >
      <TokenSelector token={token.value} onChange={token.onChange} />

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
