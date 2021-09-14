import wingImage from "../../assets/images/angelprotocol-wings-wht.png";

export default function Banner() {
  return (
    <section className="grid items-center bg-banner bg-no-repeat w-full bg-cover h-banner-sm sm:h-banner">
      <div className="container mx-auto  grid grid-cols-1a items-center">
        <section className="max-w-3xl pl-5">
          <h1 className="text-3xl  sm:text-4xl sm:leading-snug md:text-5xl text-white md:leading-normal">
            Simplified endowments that empower charities to{" "}
            <span className="block font-extrabold text-angel-orange">
              have funding forever
            </span>
          </h1>
        </section>
        <img src={wingImage} alt="" className="hidden lg:w-80" />
      </div>
    </section>
  );
}
