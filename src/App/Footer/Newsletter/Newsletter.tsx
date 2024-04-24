import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import SubscriptionForm from "./SubscriptionForm";

export default function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-6 w-full px-1 lg:w-full lg:max-w-xs xl:max-w-md">
      <h6 className="text-base font-bold  text-[#4585bb] mb-1">
        Subscribe to our newsletter
      </h6>
      <p className="text-[12px] text[#647581] text-justify font-normal opacity-90 md:w-full lg:w-full w-[90%]">
        By subscribing to this newsletter you confirm that you <br /> have read
        and agree with our{" "}
        <span className="underline font-medium text-[#000] opacity-[1]">
          <Link to={appRoutes.privacy_policy}>Privacy Policy</Link>.
        </span>
      </p>
      <span className="flex flex-col md:items-start gap-3 w-full  lg:w-full md:w-[45%]">
        <SubscriptionForm />
      </span>
    </div>
  );
}
