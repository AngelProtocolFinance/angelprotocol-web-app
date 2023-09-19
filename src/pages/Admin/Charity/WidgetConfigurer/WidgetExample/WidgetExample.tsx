import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "components/Image";
import { getPossessiveForm } from "helpers";
import { LOGO_DARK, PAYMENT_WORDS, titleCase } from "constants/common";
import { FormValues } from "../schema";
import Donater from "./Donater";

export default function WidgetExample({ trigger }: { trigger: boolean }) {
  const { getValues } = useFormContext<FormValues>();

  const [formValues, setFormValues] = useState<FormValues>(getValues());

  useEffect(() => setFormValues(getValues()), [trigger, getValues]);

  const endowName = formValues.endowment.name || "ENDOWMENT_NAME";

  return (
    <div className="h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-gray-d2 bg-white">
      <div className="grid grid-rows-[1fr_auto] gap-10 h-full">
        <div className="flex flex-col gap-3 max-w-3xl h-full mx-auto px-5">
          <header className="flex justify-center items-center gap-10 w-full h-24 z-10">
            <h1 className="text-xl">
              {getPossessiveForm(endowName)} endowment
            </h1>
            <button className="btn btn-orange px-3 h-10 rounded-lg text-xs normal-case">
              0x1...ad4
            </button>
          </header>
          <section className="flex flex-col items-center gap-5 h-full">
            {!formValues.hideText && (
              <>
                <p className="font-body text-xs">
                  {titleCase(PAYMENT_WORDS.verb)} today to{" "}
                  {getPossessiveForm(endowName)} endowment. Your donation will
                  be protected and compounded in perpetuity to provide{" "}
                  {endowName} with a long-term, sustainable runway. Give once,
                  give forever!
                </p>
                <p className="font-body text-xs">
                  Make sure to check out the many crypto and fiat donation
                  options. You will be given the chance to provide your personal
                  details to receive an immediate tax receipt.
                </p>
              </>
            )}
            <div className="justify-self-center grid mt-5 w-3/4">
              <span className="text-center font-normal text-xs">
                Connect the wallet of your choice to donate crypto. <br />
                Continue below to {PAYMENT_WORDS.verb} fiat (Dollars, GBP, AUD,
                Euro)
              </span>
              <Donater {...formValues} />
            </div>
          </section>
        </div>
        <footer className="flex justify-center items-center h-20 w-full bg-blue">
          <Image className="w-20" {...LOGO_DARK} />
        </footer>
      </div>
    </div>
  );
}
