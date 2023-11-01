import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { TxPackage } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { useSetter } from "store/accessors";
import { SubmitStep, setStep } from "slices/donation";
import { sendDonation } from "slices/donation/sendDonation";
import { chains } from "constants/chains-v2";
import { appRoutes } from "constants/routes";
import Image from "../../../Image";
import { Row } from "./Row";

type Props = PropsWithChildren<
  SubmitStep & { txPackage?: TxPackage; wallet?: ConnectedWallet }
>;

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
      <Row title="Currency:">
        <Image
          className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
          src={props.details.token.logo}
        />
        <span>{props.details.token.symbol}</span>
      </Row>

      <Row title="Blockchain:">
        <span>{chains[props.details.chainId.value].name}</span>
      </Row>
      {props.wallet && (
        <Row title="Wallet:">
          <Image
            className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
            src={props.wallet.logo}
          />
          <span>{props.wallet.name}</span>
          <button
            disabled={props.wallet.status === "switching"}
            onClick={props.wallet.disconnect}
            type="button"
            className="ml-2 btn-outline-filled text-2xs px-1 py-0.5 rounded-sm font-normal font-work"
          >
            change
          </button>
        </Row>
      )}

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
