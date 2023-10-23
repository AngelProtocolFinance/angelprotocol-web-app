import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { TxPackage } from "types/tx";
import { useSetter } from "store/accessors";
import { SubmitStep, setStep } from "slices/donation";
import { sendDonation } from "slices/donation/sendDonation";
import { appRoutes } from "constants/routes";

type Props = PropsWithChildren<SubmitStep & { txPackage?: TxPackage }>;

export default function Container({ children, txPackage, ...props }: Props) {
  const dispatch = useSetter();
  function goBack() {
    dispatch(setStep(props.kyc ? "kyc-form" : "donate-form"));
  }
  function submit(txPackage: TxPackage) {
    dispatch(sendDonation({ donation: props, ...txPackage }));
  }
  return (
    <div className="grid content-start">
      {children}
      <div className="mt-14 grid grid-cols-2 gap-5">
        <button
          className="btn-outline-filled btn-donate"
          onClick={goBack}
          type="button"
        >
          Back
        </button>
        <button
          className="btn-orange btn-donate"
          onClick={!txPackage ? undefined : () => submit(txPackage)}
          disabled={!txPackage}
          type="submit"
        >
          Complete
        </button>
        <Link
          to={appRoutes.marketplace + `/${props.recipient.id}`}
          className="col-span-full btn-outline btn-donate"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
