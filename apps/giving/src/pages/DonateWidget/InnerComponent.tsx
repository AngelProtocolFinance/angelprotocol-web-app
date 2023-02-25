import Logo from "@giving/components/Logo";
import WalletSuite from "@giving/components/WalletSuite";
import { Steps } from "@giving/components/donation";
import { LOGO } from "@giving/constants/common";
import { getPossessiveForm } from "@giving/helpers";
import { setRecipient } from "@giving/slices/donation";
import { useSetter } from "@giving/store";
import { useEffect } from "react";
import useWidgetParams from "./useWidgetParams";

export default function InnerComponent(props: {
  id: number;
  name: string;
  isKYCRequired: boolean;
}) {
  const { hideText, ...rest } = useWidgetParams();

  const dispatch = useSetter();

  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-10 bg-white">
      <div className="flex flex-col gap-3 max-w-3xl h-full mx-auto px-5">
        <header className="flex justify-center items-center gap-10 w-full h-24 z-20">
          <h1 className="text-lg sm:text-3xl font-heading font-bold">
            {getPossessiveForm(props.name)} endowment
          </h1>
          <WalletSuite />
        </header>
        <section className="flex flex-col items-center gap-5 h-full">
          {!hideText && (
            <>
              <p className="font-body text-xs sm:text-base">
                Donate today to {getPossessiveForm(props.name)} endowment. Your
                donation will be protected and compounded in perpetuity to
                provide {props.name} with a long-term, sustainable runway. Give
                once, give forever!
              </p>
              <p className="font-body text-xs sm:text-base">
                Make sure to check out the many crypto and fiat donation
                options. You will be given the chance to provide your personal
                details to receive an immediate tax receipt.
              </p>
            </>
          )}

          <Steps className="mt-5 w-3/4" {...rest} />
        </section>
      </div>
      <footer className="flex justify-center items-center h-20 w-full bg-blue dark:bg-blue-d3">
        <Logo className="w-20" logo={LOGO} />
      </footer>
    </div>
  );
}
