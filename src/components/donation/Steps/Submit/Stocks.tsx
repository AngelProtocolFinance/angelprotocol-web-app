import { appRoutes } from "constants/routes";
import { StockCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

export default function Stocks(props: StockCheckoutStep) {
  const profileUrl = `${window.location.origin}${appRoutes.donate}/${props.recipient.id}`;
  const dispatch = useSetter();
  return (
    <div className="grid content-start @md:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("donate-form"))} />
      <p className="mt-4 text-center text-gray-d1 uppercase">
        Donation pending
      </p>
      <p className="mt-4 text-center">
        To complete this donation, please email or provide your broker with the
        following information:
      </p>
      <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-3 text-sm leading-relaxed mt-4">
        <p>Please transfer [X] shares of [ABC] to:</p>
        <p>Deliver to: Fidelity Investments</p>
        <p>DTC number: 0226</p>
        <p>Account number: Z40390069</p>
        <p>Account name: Altruistic Partners Empowering Society, Inc</p>
        <p>
          Reference: [Internal Ref#, if needed] {props.recipient.name} (
          {profileUrl})
        </p>
      </div>
    </div>
  );
}
