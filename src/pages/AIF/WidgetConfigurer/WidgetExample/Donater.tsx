import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Props } from "./types";
import { DonateValues } from "components/donation/Steps/Donater/types";
import { placeholderChain } from "contexts/WalletContext/constants";
import { BtnPrimary } from "components/donation";
import { humanize } from "helpers";
import AdvancedOptions from "./AdvancedOptions";

export default function Donater({
  hideAdvancedOptions,
  liquidPercentage,
  unfoldAdvancedOptions,
  valuesTrigger: setValueTrigger,
}: Props) {
  const token = placeholderChain.tokens[0];

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      token: { ...token, amount: "1" },
      pctLiquidSplit: liquidPercentage,
      tokens: [{ ...token, amount: "1" }],
      chainName: placeholderChain.chain_name,
      chainId: placeholderChain.chain_id,
    },
  });

  useEffect(
    () => methods.setValue("pctLiquidSplit", liquidPercentage),
    [liquidPercentage, setValueTrigger, methods]
  );

  return (
    <FormProvider {...methods}>
      <div className="grid rounded-md w-full">
        <div className="grid">
          <div className="flex max-sm:flex-col max-sm:items-start items-center mb-1">
            <label
              htmlFor="amount"
              className="text-lg font-bold mr-auto max-sm:mb-2"
            >
              Enter the donation amount:
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-right hover:text-blue text-xs flex"
              >
                BAL: {humanize(+token.balance, 3)} {token.symbol}
              </button>
            </div>
          </div>

          <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 py-3 px-4 dark:bg-blue-d6 border border-prim rounded">
            <input
              disabled
              {...methods.register("token.amount")}
              type="text"
              placeholder="0.0000"
              className="w-full text-sm bg-transparent focus:outline-none dark:text-gray dark:placeholder:text-gray-d1"
            />
            <div className="flex items-center gap-1 w-full dark:text-gray">
              <span className="text-sm">{token.symbol}</span>
            </div>
          </div>
          <p className="text-xs">
            Minimal amount: {token.symbol} {token.min_donation_amnt}
          </p>
        </div>

        {!hideAdvancedOptions && (
          <AdvancedOptions unfold={unfoldAdvancedOptions} />
        )}

        <BtnPrimary className="justify-self-center w-44 font-body mt-8 md:mt-12">
          Continue
        </BtnPrimary>
      </div>
    </FormProvider>
  );
}
