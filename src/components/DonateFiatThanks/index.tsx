import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";

export default function DonateFiatThanks() {
  return (
    <div className="justify-self-center grid padded-container max-w-[35rem] py-8 sm:py-20 scroll-mt-6">
      <div className={`justify-self-center grid`}>
        <div className={`grid justify-items-center`}>
          <Icon type="CheckCircle" size={96} className="text-green mb-8" />
          <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-12 text-center leading-relaxed">
            Thank you for your donation
          </h3>
          <p className="text-center mb-8">
            If you requested it, a tax receipt has been sent to the email
            address provided.
          </p>
          <Link
            to={appRoutes.marketplace}
            className="w-full sm:w-auto btn-orange btn-donate"
          >
            Back to the platform
          </Link>
        </div>
      </div>
    </div>
  );
}
