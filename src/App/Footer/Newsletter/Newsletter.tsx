import SubscriptionForm from "./SubscriptionForm";

export default function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-2.5 w-full px-6 md:w-4/5 md:px-0 lg:w-full lg:max-w-xs xl:max-w-md">
      <div className="flex flex-col items-center w-full md:w-4/5 md:items-start lg:w-full">
        <h6 className="font-header font-bold text-base uppercase">
          Subscribe to our newsletter
        </h6>
        <p className="font-work font-normal text-sm text-center md:text-left">
          By subscribing to this newsletter you confirm that you have read and
          agree with our{" "}
          <a
            href="https://angelprotocol.io/privacy-policy/"
            rel="noreferrer"
            className="font-bold cursor-pointer underline"
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
