import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import SubscriptionForm from "./SubscriptionForm";

export default function Newsletter({ classes = "" }) {
  return (
    <div className={`grid content-start px-1 ${classes}`}>
      <h6 className="text-base font-bold  text-[#4585bb] mb-1">
        Subscribe to our newsletter
      </h6>
      <p className="text-[12px] text[#647581] text-justify font-normal">
        By subscribing to this newsletter you confirm that you <br /> have read
        and agree with our{" "}
        <Link
          to={appRoutes.privacy_policy}
          className="font-medium underline text-black"
        >
          Privacy Policy
        </Link>
      </p>
      <SubscriptionForm />
    </div>
  );
}
