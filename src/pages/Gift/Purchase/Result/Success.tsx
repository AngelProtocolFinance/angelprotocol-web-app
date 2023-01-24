import Icon from "components/Icon";
import { BtnPrim, BtnSec } from "components/gift";
import { GiftCard, TxResult } from "slices/gift";
import { getTxUrl } from "helpers";
import { chainIds } from "constants/chains";
import { appRoutes } from "constants/routes";
import { routes } from "../../routes";
import { hashKey } from "../constants";

type Props = { classes?: string } & (TxResult | GiftCard);

export default function Success(props: Props) {
  const hasRecipient = hashKey in props;

  return (
    <div className={`grid justify-items-center ${props.classes ?? ""}`}>
      <Icon type="CheckCircle" size={109.8} className="text-green mb-8" />
      <h3 className="text-2xl sm:text-3xl font-bold text-center">
        Thank you for purchasing Angel Protocol Giftcard
      </h3>

      {hasRecipient ? (
        <Result hash={props.hash} />
      ) : (
        <EmailCode secret={props.secret} />
      )}

      <BtnPrim
        as="link"
        to={appRoutes.marketplace}
        className="w-full text-center sm:w-auto min-w-[15.6rem]"
      >
        Back to the platform
      </BtnPrim>
    </div>
  );
}

function Result(props: { hash: string }) {
  return (
    <>
      <p className="text-center mt-4 mb-8">
        Giftcard balance is credited to the recipient's wallet.
      </p>
      <BtnSec
        as="a"
        href={getTxUrl(chainIds.juno, props.hash)}
        className="flex items-center justify-center gap-3.5 w-full sm:w-auto mb-3 min-w-[15.6rem]"
      >
        <Icon type="ExternalLink" size={22} />
        <span>View transaction</span>
      </BtnSec>
    </>
  );
}
function EmailCode({ secret }: { secret: string }) {
  return (
    <>
      <p className="text-center font-heading mt-4 mb-8">
        Send the code below to your chosen recipient.
      </p>
      <div className="grid border border-prim rounded-lg overflow-clip">
        <p className="text-xs text-center uppercase text-gray-d1 dark:text-gray p-4 border-b border-prim">
          Your giftcard code:
        </p>
        <p className="bg-orange-l6 dark:bg-blue-d7 p-4 font-bold text-center text-3xl leading-relaxed break-all">
          {secret}
        </p>
      </div>
      <BtnSec
        as="link"
        to={`../${routes.mail}`}
        state={{ secret }}
        className="flex items-center justify-center gap-3.5 w-full sm:w-auto mb-3 mt-8 sm:mb-12 sm:mt-8 "
      >
        <Icon type="Email" size={24} />
        <span>Send gift card via email</span>
      </BtnSec>
    </>
  );
}
