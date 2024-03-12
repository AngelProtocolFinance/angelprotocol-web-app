import { BASE_URL } from "constants/env";
import SubscriptionForm from "./SubscriptionForm";

export default function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-6 w-full px-1 lg:w-full lg:max-w-xs xl:max-w-md">
      <div className="flex flex-col items-center lg:items-start w-[80vw] lg:w-full">
        <p className="font-heading text-sm font-bold uppercase leading-6">
          Subscribe to our newsletter
        </p>
        <p className="font-normal text-xs text-center lg:text-left">
          By subscribing to this newsletter you confirm that you have read and
          agree with our{" "}
          <a
            href={`${BASE_URL}/privacy-policy/`}
            className="font-bold cursor-pointer hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <SubscriptionForm />
    </div>
  );
}
