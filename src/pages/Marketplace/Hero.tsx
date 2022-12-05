import character from "assets/images/character4.png";

export default function Hero({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`${classes} grid-cols-[3fr_2fr] gap-4 pb-12 padded-container content-start text-white`}
    >
      <h1 className="font-extrabold w-full text-2xl md:text-3xl lg:text-[2.75rem] self-end">
        <span className="block leading-tight">ANGEL PROTOCOL REDEFINES</span>
        <span className="block leading-tight text-orange">
          GLOBAL IMPACT FINANCING.
        </span>
      </h1>
      <div
        className="row-span-2 self-end w-full h-full relative -bottom-[20%]"
        style={{
          transform: "scaleX(-1.5) scaleY(1.5)",
          background: `url('${character}') 50% 50% / contain no-repeat`,
        }}
      />
      <p className="text-2xl w-full leading-relaxed">
        We provide impact stakeholders like non-profits and social entrepreneurs
        with the tools to raise, coordinate, and invest capital. With Angel
        Protocol, impact is amplified. Funding goes further, connections run
        deeper, and access is available to all.{" "}
        <span className="md:leading-normal xl:leading-relaxed font-bold">
          Donate below!
        </span>
      </p>
    </div>
  );
}
