import { useEffect } from "react";
import APLogo from "components/APLogo";
import Balances from "components/Balances";
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
    <div className="padded-container flex flex-col max-w-3xl h-screen">
      <header className="flex justify-between items-center w-full h-[90px]">
        <h1 className="text-3xl font-heading font-bold">
          {getPossessiveForm(props.name)} endowment
        </h1>
        <WalletSuite />
      </header>
      <section className="flex flex-col gap-5 h-full">
        <p className="font-body">
          Donate today to {getPossessiveForm(props.name)} endowment. Your
          donation will be protected and compounded in perpetuity to provide{" "}
          {props.name} with a long-term, sustainable runway. Give once, give
          forever!
        </p>
        <p className="font-body">
          Make sure to check out the many crypto and fiat donation options. You
          will be given the chance to provide your personal details to receive
          an immediate tax receipt.
        </p>
        <Balances profileId={props.id} />
        <Steps />
      </section>
      <footer className="flex justify-center items-center h-20 bg-blue dark:bg-blue-d3">
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
