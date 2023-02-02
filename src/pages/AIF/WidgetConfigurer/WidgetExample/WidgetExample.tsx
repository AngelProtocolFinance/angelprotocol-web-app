import { Props } from "./types";
import APLogo from "components/APLogo";
import Progress from "components/donation/Steps/Progress";
import Donater from "./Donater";

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
