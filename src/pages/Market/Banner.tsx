export default function Banner() {
  return (
    <div className="grid lg:grid-cols-2 mb-8 mt-4 gap-5">
      <img
        src="https://charity-profile-images.s3.amazonaws.com/logo/Ukraine-2109x1406.jpg"
        alt=""
        className="rounded-lg"
      />
      <div className="order-first lg:order-none self-center">
        <a
          href="https://ukraine.angelprotocol.io/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="font-heading text-white-grey font-extrabold text-3xl md:text-4xl lg:text-5xl">
            ANGEL PROTOCOL SUPPORTS
          </p>
          <p className="font-heading text-angel-orange font-extrabold text-3xl md:text-4xl lg:text-5xl mb-4">
            DISPLACED UKRAINIANS.
          </p>
        </a>
        <p className="font-heading text-white-grey text-xl xl:text-2xl mb-0">
          <span className="md:leading-normal xl:leading-relaxed">
            Ongoing conflict has led to a humanitarian crisis in Ukraine that
            could displace over 7 million people.
          </span>{" "}
          <span className="md:leading-normal xl:leading-relaxed font-bold">
            <a
              href="https://ukraine.angelprotocol.io/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Fund relief & refugee efforts by donating crypto assets today!
            </a>
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
