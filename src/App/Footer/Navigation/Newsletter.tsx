export default function Newsletter() {
  return (
    <div className="flex flex-col items-start gap-2.5 ">
      <div className="flex flex-col items-start">
        <h6 className="font-header font-bold text-sm xl:text-base uppercase">
          Subscribe to our newsletter
        </h6>
        <p className="font-body font-normal text-xs xl:text-sm">
          By subscribing to this newsletter you confirm that you have read and
          agree with our{" "}
          <a
            href="https://angelprotocol.io/privacy-policy/"
            rel="noreferrer"
            target="_blank"
            className="cursor-pointer underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
