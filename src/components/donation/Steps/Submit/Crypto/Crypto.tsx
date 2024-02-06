import Icon from "components/Icon";
import { chains } from "constants/chains";
import { maskAddress } from "helpers";
import { PropsWithChildren } from "react";
import { CryptoSubmitStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import { ConnectedWallet } from "types/wallet";
import Image from "../../../../Image";
import BackBtn from "../../BackBtn";
import { Row } from "./Row";

type Props = PropsWithChildren<CryptoSubmitStep & { wallet?: ConnectedWallet }>;

export default function Container({ children, ...props }: Props) {
  const dispatch = useSetter();
  function goBack() {
    dispatch(setStep("splits"));
  }

  return (
    <div className="grid content-start p-4 @md:p-8">
      <div className="flex items-center justify-between">
        <BackBtn type="button" onClick={goBack} className="mb-4" />
        {props.wallet && (
          <div className="grid grid-cols-[auto_auto_1fr] items-center text-sm">
            <Image
              className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
              src={props.wallet.logo}
            />
            <span>{props.wallet.name}</span>
            <button
              disabled={props.wallet.isSwitching}
              onClick={props.wallet.disconnect}
              type="button"
              className="ml-2 btn-outline-filled text-2xs px-1 py-0.5 rounded-sm font-normal font-work"
            >
              change
            </button>
            <p className="col-span-full text-xs text-right border-t border-prim mt-1 pt-1">
              {maskAddress(props.wallet.address)}
            </p>
          </div>
        )}
      </div>

      <h4 className="flex items-center text-lg gap-2 mt-6">
        <Icon type="StickyNote" />
        <span className="font-semibold">Your donation summary</span>
      </h4>

      <div>
        <Row>
          <p className="mr-auto">Currency</p>
          <Image
            className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
            src={props.details.token.logo}
          />
          <span className="text-gray-d2">{props.details.token.symbol}</span>
        </Row>

        <Row>
          <p className="mr-auto">Blockchain</p>
          <span className="text-gray-d2">
            {chains[props.details.chainId.value].name}
          </span>
        </Row>

        <Row>
          <p className="mr-auto">Donation for {props.recipient.name}</p>
          <div></div>
        </Row>
      </div>

      {children}
    </div>
  );
}
