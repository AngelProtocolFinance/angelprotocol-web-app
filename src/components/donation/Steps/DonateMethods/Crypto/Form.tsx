import { Label } from "components/form";
import TokenField from "../../../../TokenField";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { ProgramSelector } from "../../common/ProgramSelector";
import { initTokenOption } from "../../common/constants";
import type { CryptoFormStep } from "../../types";
import { nextFormState } from "../helpers";
import { ChainSelector } from "./ChainSelector";
import type { DonateValues } from "./types";
import { useRhf } from "./useRhf";

export default function Form(props: CryptoFormStep) {
  const { setState } = useDonationState();

  const { handleSubmit, reset, setValue, program, token, chainId, errors } =
    useRhf(props);

  function submit({ chainId, ...data }: DonateValues) {
    if (!chainId) throw "dev: chainId should be validated";
    setState((prev) =>
      nextFormState(prev, { ...data, method: "crypto", chainId })
    );
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 rounded-md min-h-full"
      autoComplete="off"
    >
      <Label
        htmlFor="chainId"
        className="-mb-2 font-semibold font-heading text-base"
        required
      >
        Network
      </Label>
      <ChainSelector
        ref={chainId.ref}
        value={chainId.value}
        error={errors.chainId}
        onChange={(id) => {
          chainId.onChange(id);
          //reset selected token
          setValue("token", initTokenOption);
        }}
      />

      <TokenField
        ref={token.ref}
        token={token.value}
        onChange={token.onChange}
        chainId={chainId.value}
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
