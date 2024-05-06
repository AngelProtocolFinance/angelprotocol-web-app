import { Label } from "components/form";
import { chainList } from "constants/chains";
import { IS_TEST } from "constants/env";
import { useFormContext } from "react-hook-form";
import type { ChainID } from "types/chain";
import type { DonationSource } from "types/lists";
import { Selector } from "../../../../Selector";
import TokenField from "../../../../TokenField";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { initToken } from "./constants";
import type { DonateValues } from "./types";

type Props = {
  source: DonationSource;
};

export default function Form({ source }: Props) {
  const [, setState] = useDonationState();

  const { watch, reset, setValue, handleSubmit } =
    useFormContext<DonateValues>();

  function submit(data: DonateValues) {
    setState({
      ...data,
      method: "crypto",
      source,
    });
    reset();
  }

  const chainId = watch("chainId");

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
          setValue("token", initToken);
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
        selectedChainId={chainId.value}
        withBalance
        label="Donation amount"
        classes={{
          label: "font-heading mb-1",
          inputContainer: "field-container-donate pr-5",
        }}
        withMininum
      />

      <ContinueBtn className="mt-auto" type="submit" />
    </form>
  );
}
