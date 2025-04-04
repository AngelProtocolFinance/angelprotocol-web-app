import { Link } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import SubscriptionForm from "./subscription-form";

export default function Newsletter({ classes = "" }) {
  return (
    <div
      className={`grid content-start px-1 ${classes} sm:max-md:grid-cols-2 xl:grid-cols-1 gap-x-8 xl:max-w-md`}
    >
      <div className="mb-6">
        <p className="text-blue-d1 mb-3.5">Subscribe to our newsletter</p>
        <p className="text-[12px] text-gray-d4 text-justify text-pretty">
          By subscribing to this newsletter you confirm that you have read and
          agree with our{" "}
          <Link
            to={appRoutes.privacy_policy}
            className="font-medium underline text-black"
          >
            Privacy Policy
          </Link>
        </p>
      </div>

      <SubscriptionForm />
    </div>
  );
}
