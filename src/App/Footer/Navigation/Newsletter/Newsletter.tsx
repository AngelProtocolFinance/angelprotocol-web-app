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
            className="font-bold cursor-pointer underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <form
        className="flex items-start gap-3 xl:gap-6"
        onSubmit={(e) => console.log("submitted", e)}
      >
        <input
          className="flex items-center py-2 px-3 border border-gray-l2 rounded-lg"
          placeholder="Enter your email address here"
        />
        <button
          type="submit"
          className="btn-primary flex items-center justify-center uppercase py-2 px-3 rounded-lg"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
