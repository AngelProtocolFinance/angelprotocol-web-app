import Icon from "components/Icon";
import { chains } from "constants/chains";
import { CryptoSubmitStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import Image from "../../../../Image";
import BackBtn from "../../BackBtn";
import Checkout from "./Checkout";
import { Row } from "./Row";

export default function Crypto(props: CryptoSubmitStep) {
  const dispatch = useSetter();
  function goBack() {
    dispatch(setStep("splits"));
  }
  const { details, recipient } = props;

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn type="button" onClick={goBack} className="mb-4" />

      <h4 className="flex items-center text-lg gap-2 mb-1">
        <Icon type="StickyNote" />
        <span className="font-semibold">Your donation summary</span>
      </h4>

      <div>
        <Row>
          <p className="mr-auto">Currency</p>
          <Image
            className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
            src={details.token.logo}
          />
          <span className="text-gray-d2">{details.token.symbol}</span>
        </Row>

        <Row>
          <p className="mr-auto">Blockchain</p>
          <span className="text-gray-d2">
            {chains[details.chainId.value].name}
          </span>
        </Row>

        <Row>
          <p className="mr-auto">Donation for {recipient.name}</p>
          <div></div>
        </Row>
      </div>
      <Checkout {...props} classes="mt-4" />
    </div>
  );
}
