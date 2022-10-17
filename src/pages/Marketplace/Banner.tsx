import character from "assets/images/character4.png";

export default function Banner({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`${classes} grid-cols-[3fr_2fr] gap-4 pt-28 pb-4 padded-container content-start text-white `}
    >
      <h1 className="font-extrabold max-w-md text-2xl md:text-3xl lg:text-4xl self-end">
        <div className="leading-tight">ANGEL PROTOCOL REDEFINES</div>
        <div className="leading-tight text-orange">
          GLOBAL IMPACT FINANCING.
        </div>
      </h1>
      <div
        className="row-span-2 self-end w-full h-full relative -bottom-[12%] -left-[18%]"
        style={{
          transform: "scaleX(-1.3) scaleY(1.3)",
          background: `url('${character}') 50% 50% / contain no-repeat`,
        }}
      />
      <p className="text-xl max-w-xl leading-relaxed font-heading">
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
