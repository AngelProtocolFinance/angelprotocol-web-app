import Icon from "components/Icon";
import { BtnPrimary } from "components/donation";
import { appRoutes } from "constants/routes";

export default function Success({
  classes,
}: {
  classes?: string;
  code: string;
}) {
  return (
    <div className={`grid justify-items-center ${classes}`}>
      <Icon type="CheckCircle" size={96} className="text-green mb-8" />
      <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-12 font-bold text-center leading-relaxed">
        Thank you for purchasing Angel Protocol Giftcard
      </h3>
      <p className="text-center mb-8">
        Use the code below with a wallet to start donating. The code has also
        been sent to your email address.
      </p>

      <BtnPrimary
        as="link"
        to={appRoutes.marketplace}
        className="w-full text-center sm:w-auto"
      >
        Back to the platform
      </BtnPrimary>
    </div>
  );
}
