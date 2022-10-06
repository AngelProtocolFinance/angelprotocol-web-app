export default function Banner() {
  return (
    <div className="grid lg:grid-cols-2 mb-8 mt-4 gap-5">
      <img
        src="https://charity-profile-images.s3.amazonaws.com/banner/hero3.jpg"
        alt=""
        className="rounded-lg"
      />
      <div className="order-first lg:order-none self-center">
        <p className="font-heading text-white font-extrabold text-3xl md:text-4xl lg:text-5xl">
          ANGEL PROTOCOL REDEFINES
        </p>
        <p className="font-heading text-orange-l1 font-extrabold text-3xl md:text-4xl lg:text-5xl mb-4">
          GLOBAL IMPACT FINANCING.
        </p>
        <p className="font-heading text-gray-d2 text-xl xl:text-2xl mb-0">
          <span className="md:leading-normal xl:leading-relaxed">
            We provide impact stakeholders like non-profits and social
            entrepreneurs with the tools to raise, coordinate, and invest
            capital. With Angel Protocol, impact is amplified. Funding goes
            further, connections run deeper, and access is available to all.
          </span>{" "}
          <span className="md:leading-normal xl:leading-relaxed font-bold">
            Donate below!
            {/*or{" "}
            <a
              href="https://app.angelprotocol.io/register"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              register today!
            </a>*/}
          </span>
        </p>
      </div>
      <div className="self-start font-heading text-white uppercase text-left">
        <p className="font-bold pb-1 text-lg md:text-xl">&nbsp;</p>
        <p className="md:text-l text-white/80">&nbsp;</p>
      </div>
    </div>
  );
}
