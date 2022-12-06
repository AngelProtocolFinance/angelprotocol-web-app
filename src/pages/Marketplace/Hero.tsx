import character from "assets/images/character4.svg";

export default function Hero({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`${classes} grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 padded-container justify-items-center lg:content-start text-white`}
    >
      <h1 className="order-1 font-extrabold w-full text-[1.63rem] md:text-3xl lg:text-[2.75rem] text-center lg:text-left lg:self-end">
        <span className="lg:block leading-tight">ANGEL PROTOCOL REDEFINES</span>
        <span className="lg:block pl-2 lg:pl-0 leading-tight text-orange">
          GLOBAL IMPACT FINANCING.
        </span>
      </h1>
      <img
        src={character}
        alt=""
        className="order-3 row-span-2 self-end w-[420px] aspect-square"
      />
      <p className="order-2 lg:order-3 text-[1.13rem] lg:text-2xl w-full leading-relaxed text-center lg:text-left">
        We provide impact stakeholders like non-profits and social entrepreneurs
        with the tools to raise, coordinate, and invest capital. With Angel
        Protocol, impact is amplified. Funding goes further, connections run
        deeper, and access is available to all.{" "}
        <span className="block lg:inline md:leading-normal xl:leading-relaxed font-bold">
          Donate below!
        </span>
      </p>
    </div>
  );
}
