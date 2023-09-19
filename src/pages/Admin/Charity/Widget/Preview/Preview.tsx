import Image from "components/Image";
import { useGetter } from "store/accessors";
import { possesiveForm } from "helpers";
import { LOGO_DARK, PAYMENT_WORDS, titleCase } from "constant/common";
import DonaterSample from "./DonaterSample";

export default function Preview({ classes = "" }) {
  const widgetConfig = useGetter((state) => state.widget);
  const { endowment, isDescriptionTextShown } = widgetConfig;
  const endowName = endowment.name ?? "Endowment name";
  return (
    <section className={classes + " @container/preview"}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        That's what our widget looks like:
      </h2>
      <div className="pt-6 flex flex-col @xl/preview:pt-10 h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-gray-d2 bg-white">
        <header className="mb-10 px-10 flex justify-between items-center w-full">
          <h1 className="text-xl">{endowName}</h1>
          <button className="btn btn-orange px-3 h-10 rounded-lg text-xs normal-case">
            0x1...ad4
          </button>
        </header>
        {isDescriptionTextShown && (
          <>
            <p className="px-6 @xl/preview:px-10 font-body text-sm mb-4 text-center @xl/preview:text-left">
              {titleCase(PAYMENT_WORDS.verb)} today to{" "}
              {possesiveForm(endowName)} endowment. Your donation will be
              protected and compounded in perpetuity to provide {endowName} with
              a long-term, sustainable runway. Give once, give forever!
            </p>
            <p className="px-6 @xl/preview:px-10 font-body text-sm mb-10 text-center @xl/preview:text-left">
              Make sure to check out the many crypto and fiat donation options.
              You will be given the chance to provide your personal details to
              receive an immediate tax receipt.
            </p>
          </>
        )}
        <p className="px-6 @xl/preview:px-10 text-center text-sm mb-3">
          Connect the wallet of your choice to donate crypto. <br />
          Continue below to {PAYMENT_WORDS.verb} fiat (Dollars, GBP, AUD, Euro)
        </p>
        <DonaterSample
          {...widgetConfig}
          classes="mb-10 px-6 @xl/preview:px-10"
        />

        <footer className="grid place-items-center h-20 w-full bg-blue mt-auto">
          <Image className="w-20" {...LOGO_DARK} />
        </footer>
      </div>
    </section>
  );
}
