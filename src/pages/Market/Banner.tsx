export default function Banner() {
  return (
    <div className="grid lg:grid-cols-2 mb-8 mt-4 gap-5">
      <img
        src="https://charity-profile-images.s3.amazonaws.com/logo/Ukraine-2109x1406.png"
        alt=""
        className="rounded-lg"
      />
      <div className="order-first lg:order-none self-center">
        <a
          href="https://ukraine.angelprotocol.io/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="font-heading text-white-grey font-extrabold text-5xl md:text-6xl lg:text-7xl">
            ANGEL PROTOCOL SUPPORTS
          </p>
          <p className="font-heading text-angel-orange font-extrabold text-5xl md:text-6xl lg:text-7xl mb-4">
            DISPLACED UKRAINIANS.
          </p>
        </a>
        <p className="font-heading text-white-grey text-xl xl:text-2xl mb-0">
          <span className="md:leading-normal xl:leading-relaxed font-bold">
            Ongoing conflict has led to a humanitarian crisis in Ukraine that
            could displace over 7 million people.
          </span>{" "}
          <span className="md:leading-normal xl:leading-relaxed">
            Fund relief & refugee efforts by donating crypto assets today!
          </span>
        </p>
      </div>
      <div className="self-start font-heading text-white uppercase text-left">
        <p className="font-bold pb-1 text-lg md:text-xl">&nbsp;</p>
        <p className="md:text-l text-opacity-80">&nbsp;</p>
      </div>
    </div>
  );
}
