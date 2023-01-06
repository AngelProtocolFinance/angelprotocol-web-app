// import { useParams } from "react-router-dom";
import WalletSuite from "App/WalletSuite";
import { useEffect } from "react";
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
    <div className="padded-container justify-self-center grid max-w-3xl">
      <header className="sticky top-0 z-20 flex justify-between items-center w-full h-[90px]">
        <span>{getPossessiveForm(props.name)} endowment</span>
        <WalletSuite />
      </header>
      <section>
        <p>
          Donate today to {getPossessiveForm(props.name)} endowment. Your
          donation will be protected and compounded in perpetuity to provide{" "}
          {props.name} with a long-term, sustainable runway. Give once, give
          forever!
        </p>
        <p>
          Make sure to check out the many crypto and fiat donation options. You
          will be given the chance to provide your personal details to receive
          an immediate tax receipt.
        </p>
        <Steps />
      </section>
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
