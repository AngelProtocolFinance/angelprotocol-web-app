import SubscriptionForm from "./SubscriptionForm";

export default function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-6 w-full px-1 lg:w-full lg:max-w-xs xl:max-w-md">
      <div className="flex flex-col items-center w-[80vw] lg:w-full">
        <h6 className="font-header font-black text-base uppercase text-center">
          Subscribe to our newsletter
        </h6>
        <p className="font-body font-normal text-sm text-center md:text-left">
          By subscribing to this newsletter you confirm that you have read and
          agree with our{" "}
          <a
            href="https://angelprotocol.io/privacy-policy/"
            className="font-bold cursor-pointer underline hover:text-orange-l1 active:text-orange transition ease-in-out duration-300"
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
