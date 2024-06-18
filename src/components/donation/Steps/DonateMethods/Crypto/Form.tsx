import { Label } from "components/form";
import { chainList, chains } from "constants/chains";
import { IS_TEST } from "constants/env";
import { useController, useFormContext } from "react-hook-form";
import type { ChainID } from "types/chain";
import { Selector } from "../../../../Selector";
import TokenField from "../../../../TokenField";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { ProgramSelector } from "../../common/ProgramSelector";
import { initTokenOption } from "../../common/constants";
import type { CryptoFormStep } from "../../types";
import { nextFormState } from "../helpers";
import TokenSearch from "./TokenSearch";
import type { DonateValues } from "./types";

export default function Form(props: CryptoFormStep) {
  const { setState } = useDonationState();

  const { watch, reset, setValue, handleSubmit, control } =
    useFormContext<DonateValues>();

  function submit(data: DonateValues) {
    setState((prev) => nextFormState(prev, { ...data, method: "crypto" }));
    reset();
  }

  const { field: program } = useController<DonateValues, "program">({
    control: control,
    name: "program",
  });

  const chainId = watch("chainId.value");
  const platformId = chains[chainId].coingeckoPlatformId;

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
      <Selector<DonateValues, "chainId", ChainID>
        name="chainId"
        options={chainList
          .filter((chain) => chain.isTest === IS_TEST)
          .map(({ name, id }) => ({
            label: name,
            value: id,
          }))}
        onOptionChange={() => {
          setValue("token", initTokenOption);
          setValue("token.amount", "0");
        }}
        classes={{
          container: "bg-white dark:bg-blue-d6",
          button: "field-input-donate",
          options: "text-sm",
        }}
      />
      <TokenField<DonateValues, "token">
        name="token"
        selectedChainId={chainId}
        withBalance
        label="Donation amount"
        classes={{
          label: "font-heading mb-1",
          inputContainer: "field-container-donate pr-5",
        }}
        withMininum
      />

      {platformId && (
        <TokenSearch
          onChange={(v) => console.log(v)}
          coinGeckoPlatformId={platformId}
        />
      )}

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
