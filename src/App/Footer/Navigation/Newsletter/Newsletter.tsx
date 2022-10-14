import SubscriptionForm from "./SubscriptionForm";

export default function Newsletter() {
  return (
    <div className="flex flex-col items-start gap-2.5 max-w-xs xl:max-w-md">
      <div className="flex flex-col items-start w-4/5">
        <h6 className="font-header font-bold text-sm uppercase">
          Subscribe to our newsletter
        </h6>
        <p className="font-sans font-normal text-xs">
          By subscribing to this newsletter you confirm that you have read and
          agree with our{" "}
          <a
            href="https://angelprotocol.io/privacy-policy/"
            rel="noreferrer"
            target="_blank"
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
