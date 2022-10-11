export default function Newsletter() {
  return (
    <div className="flex flex-col items-start gap-2.5 max-w-xs xl:max-w-md">
      <div className="flex flex-col items-start">
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

      <form
        className="flex items-start gap-3 xl:gap-6"
        onSubmit={(e) => console.log("submitted", e)}
      >
        <input
          className="flex items-center w-44 xl:w-72 py-2 px-3 border border-gray-l2 rounded-lg text-sm"
          placeholder="Enter your email address here"
        />
        <button
          type="submit"
          className="btn-primary flex items-center justify-center uppercase py-2 px-3 rounded-lg text-sm font-bold"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
