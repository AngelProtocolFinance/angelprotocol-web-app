import { Label } from "components/form";
import { chains } from "constants/chains";
import { useController, useFormContext } from "react-hook-form";
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

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<DonateValues>();

  function submit({ chainId, ...data }: DonateValues) {
    if (!chainId) throw "dev: chainId should be validated";
    setState((prev) =>
      nextFormState(prev, { ...data, method: "crypto", chainId })
    );
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
  const { field: token } = useController<DonateValues, "token">({
    control: control,
    name: "token",
  });

  const chain: Chain = chainId.value
    ? {
        id: chainId.value,
        name: chains[chainId.value].name,
        logo: chains[chainId.value].logo,
      }
    : { id: "", name: "", logo: "" };

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
        value={chain}
        error={errors.chainId?.message}
        onChange={(chain) => {
          chainId.onChange(chain.id);
          //reset selected token
          setValue("token", initTokenOption);
        }}
      />

      <TokenField
        ref={token.ref}
        token={token.value}
        onChange={token.onChange}
        chainId={chainId.value}
        error={errors.token?.amount?.message || errors.token?.token_id?.message}
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
