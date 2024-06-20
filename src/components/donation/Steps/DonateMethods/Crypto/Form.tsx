import { Label } from "components/form";
import { chains } from "constants/chains";
import { useController, useFormContext } from "react-hook-form";
import type { ChainID } from "types/chain";
import type { OptionType } from "types/components";
import TokenField from "../../../../TokenField";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { ProgramSelector } from "../../common/ProgramSelector";
import { initTokenOption } from "../../common/constants";
import type { CryptoFormStep } from "../../types";
import { nextFormState } from "../helpers";
import { type Chain, ChainSelector } from "./ChainSelector";
import type { DonateValues } from "./types";

export default function Form(props: CryptoFormStep) {
  const { setState } = useDonationState();

  const { reset, setValue, handleSubmit, control } =
    useFormContext<DonateValues>();

  function submit(data: DonateValues) {
    setState((prev) => nextFormState(prev, { ...data, method: "crypto" }));
    reset();
  }

  const { field: program } = useController<DonateValues, "program">({
    control: control,
    name: "program",
  });
  const { field: chainId } = useController<DonateValues, "chainId">({
    control: control,
    name: "chainId",
  });

  const chain: Chain = {
    id: chainId.value.value,
    name: chains[chainId.value.value].name,
    logo: chains[chainId.value.value].logo,
  };

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
        value={chain}
        onChange={(chain) => {
          chainId.onChange({
            value: chain.id,
            label: chain.name,
          } satisfies OptionType<ChainID>);

          //reset selected token
          setValue("token", initTokenOption);
          setValue("token.amount", "0");
        }}
      />

      <TokenField<DonateValues, "token">
        name="token"
        selectedChainId={chainId.value.value}
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
