import { useEffect } from "react";
import APLogo from "components/APLogo";
import WalletSuite from "components/WalletSuite";
import { Steps } from "components/donation";
import { useSetter } from "store/accessors";
import { setRecipient } from "slices/donation";

export default function Content(props: {
  id: number;
  name: string;
  isKYCRequired: boolean;
}) {
  const dispatch = useSetter();

  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-10">
      <div className="flex flex-col gap-3 max-w-3xl h-full mx-auto px-5">
        <header className="flex justify-between items-center w-full h-24 z-20">
          <h1 className="text-xl sm:text-3xl font-heading font-bold">
            {getPossessiveForm(props.name)} endowment
          </h1>
          <WalletSuite />
        </header>
        <section className="flex flex-col items-center gap-5 h-full">
          <p className="font-body text-sm sm:text-base">
            Donate today to {getPossessiveForm(props.name)} endowment. Your
            donation will be protected and compounded in perpetuity to provide{" "}
            {props.name} with a long-term, sustainable runway. Give once, give
            forever!
          </p>
          <p className="font-body text-sm sm:text-base">
            Make sure to check out the many crypto and fiat donation options.
            You will be given the chance to provide your personal details to
            receive an immediate tax receipt.
          </p>

          <Steps className="mt-5 w-3/4" />
        </section>
      </div>
      <footer className="flex justify-center items-center h-20 w-full bg-blue dark:bg-blue-d3">
        <APLogo className="w-20" />
      </footer>
    </div>
  );
}

function getPossessiveForm(name: string) {
  let result = `${name}'`;
  if (!name.endsWith("s")) {
    result += "s";
  }
  return result;
}
