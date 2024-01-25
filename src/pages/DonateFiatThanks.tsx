import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";

export default function DonateFiatThanks() {
  return (
    <div className="justify-self-center display-block m-auto max-w-[35rem] py-8 sm:py-20 scroll-mt-6">
      <Icon type="CheckCircle" size={96} className="text-green mb-4 mx-auto" />
      <h3 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center">
        Thank you for your donation using one of our fiat on-ramp providers!
      </h3>
      <p className="text-center mb-4">
        We'll process your donation to the nonprofit you specified as soon as
        the payment has cleared. You can safely navigate away using the button
        below.
      </p>
      <p className="text-center mb-8">
        If you need a receipt for your donation, please fill out the KYC form
        for this transaction on your{" "}
        <Link to={appRoutes.donations}>My donations</Link> page.
      </p>
      <Link
        to={appRoutes.marketplace}
        className="w-full sm:w-auto btn-orange btn-donate h-10 rounded-lg"
      >
        Back to the platform
      </Link>
    </div>
  );
}
