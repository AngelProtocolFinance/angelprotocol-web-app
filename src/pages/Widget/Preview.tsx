import { DappLogo } from "components/Image";
import { Steps } from "components/donation";
import { useEffect } from "react";
import { setRecipient } from "slices/donation";
import { useGetter, useSetter } from "store/accessors";

export default function Preview({ classes = "" }) {
  const { endowment, ...config } = useGetter((state) => state.widget);
  const endowName = endowment.name ?? "nonprofit name";

  const dispatch = useSetter();
  useEffect(() => {
    dispatch(setRecipient(endowment));
  }, [dispatch, endowment]);

  return (
    <section className={classes + " @container/preview pb-4"}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        That's what our widget looks like:
      </h2>
      <div className="h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-navy-d4 bg-white">
        <div className="flex flex-col items-center pt-6 @xl/preview:pt-10">
          <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg @sm/preview:text-3xl">
            Donate to {endowName}
          </h1>
          {!config.hideDescription && (
            <p className="text-xs text-center @sm/preview:text-base">
              Check out the many crypto and fiat donation options. Provide your
              personal details to receive an immediate tax receipt.
            </p>
          )}
          <Steps
            className="mt-5 @md/preview:w-3/4 border border-gray-l4"
            donaterConfig={{
              isPreview: true,
              isSplitDisabled: config.isSplitDisabled,
              liquidSplitPct: config.liquidSplitPct,
            }}
          />
          <footer className="grid place-items-center h-20 w-full bg-blue">
            <DappLogo classes="w-20" />
          </footer>
        </div>
      </div>
    </section>
  );
}
