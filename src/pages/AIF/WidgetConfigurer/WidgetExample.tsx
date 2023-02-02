import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "components/donation/Steps/Donater/types";
import { placeholderChain } from "contexts/WalletContext/constants";
import APLogo from "components/APLogo";
import Icon from "components/Icon";
import Split from "components/Split";
import { BtnPrimary } from "components/donation";
import Progress from "components/donation/Steps/Progress";
import { humanize } from "helpers";
import { FormValues } from "./WidgetUrlGenerator/schema";

type Props = FormValues & { valuesTrigger: boolean };

export default function WidgetExample(props: Props) {
  return (
    <div className="h-full overflow-y-auto scroller w-full xl:w-11/12 h-[900px] border border-prim rounded">
      <div className="grid grid-rows-[1fr_auto] gap-10 bg-white h-full">
        <div className="flex flex-col gap-3 max-w-3xl h-full mx-auto px-5">
          <header className="flex justify-center items-center gap-10 w-full h-24 z-10">
            <h1 className="text-lg sm:text-3xl font-heading font-bold">
              ENDOWMENT_NAME's endowment
            </h1>
            <button className="btn btn-orange px-3 h-10 rounded-lg text-xs normal-case">
              juno1k...pqc6y5
            </button>
          </header>
          <section className="flex flex-col items-center gap-5 h-full">
            {!props.hideText && (
              <>
                <p className="font-body text-xs sm:text-base">
                  Donate today to ENDOWMENT_NAME's endowment. Your donation will
                  be protected and compounded in perpetuity to provide
                  ENDOWMENT_NAME with a long-term, sustainable runway. Give
                  once, give forever!
                </p>
                <p className="font-body text-xs sm:text-base">
                  Make sure to check out the many crypto and fiat donation
                  options. You will be given the chance to provide your personal
                  details to receive an immediate tax receipt.
                </p>
              </>
            )}
            <div className="justify-self-center grid mt-5 w-3/4">
              <span className="text-center font-normal text-xs sm:text-sm">
                Don't have crypto in your wallet?{" "}
                <button
                  className="font-bold underline hover:text-orange transition ease-in-out duration-300"
                  disabled
                >
                  Buy some to make your donation
                </button>
              </span>
              <Progress classes="my-12" />
              <Donater {...props} />
            </div>
          </section>
        </div>
        <footer className="flex justify-center items-center h-20 w-full bg-blue dark:bg-blue-d3">
          <APLogo className="w-20" />
        </footer>
      </div>
    </div>
  );
}

function Donater({
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

function AdvancedOptions({ unfold }: { unfold: boolean }) {
  const [isOpen, setIsOpen] = useState(unfold);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => setIsOpen(unfold), [unfold]);

  return (
    <div className={`grid mt-10 border border-prim  rounded overflow-clip`}>
      <div className="flex items-center justify-between px-4 py-2 bg-orange-l6 dark:bg-blue-d7">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advanced Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-prim h-full aspect-square rounded grid place-items-center"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} size={15} />
        </button>
      </div>
      {isOpen && (
        <div className="grid p-6 pt-4 font-heading border-t border-prim">
          <p className="text-xs uppercase font-bold mb-2">Split</p>
          <Split<DonateValues, "pctLiquidSplit", "token">
            className="mb-6"
            liqPctField="pctLiquidSplit"
            tokenField="token"
          />
          <div className="flex items-center gap-4 px-4 py-3 text-center dark:bg-blue-d6 border border-prim rounded">
            <Icon type="Info" size={44} />
            <p className="text-sm leading-normal text-left">
              Donations into the Endowment provide sustainable financial runaway
              and allow your gift to give forever
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
