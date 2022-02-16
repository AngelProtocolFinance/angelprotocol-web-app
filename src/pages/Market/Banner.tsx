export default function Banner() {
  return (
    <div className="grid lg:grid-cols-2 mb-6 mt-4 gap-5">
      <figure>
        <img
          src="https://charity-profile-images.s3.amazonaws.com/banner/The+5+Gyres+Institute.png"
          alt=""
          className="rounded-lg"
        />
        <figcaption className="font-heading text-white uppercase text-left py-4">
          <div className="font-bold pb-1 text-lg md:text-xl">
            The 5 Gyres Institute
          </div>
          <div className="md:text-l text-opacity-80">
            SDG #12: Responsible Consumption and Production
          </div>
        </figcaption>
      </figure>

      <div className="order-first lg:order-none">
        <p className="font-heading text-white-grey font-extrabold text-4xl md:text-5xl lg:text-6xl">
          GIVE ONCE,
        </p>
        <p className="font-heading text-angel-orange font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4">
          GIVE FOREVER.
        </p>
        <p className="font-heading text-white-grey text-xl xl:text-2xl my-4">
          <span className="md:leading-normal xl:leading-relaxed font-bold">
            Want to empower a charity like The 5 Gyres Institute with financial
            freedom?
          </span>{" "}
          <span className="md:leading-normal xl:leading-relaxed">
            Find a charity from the list below, connect your wallet and donate
            to their perpetual endowment.
          </span>
        </p>
      </div>
    </div>
  );
}
