import hero from "assets/images/hero.png";
import Image from "components/Image";

export default function Hero({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`${classes} grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 padded-container justify-items-center lg:content-start text-white`}
    >
      <h1 className="order-1 font-bold w-full text-[1.63rem] md:text-3xl/tight lg:text-[2.75rem] text-center lg:text-left lg:self-end text-balance">
        <p className="contents md:block">BETTER GIVING REDEFINES</p>{" "}
        <p className="contents md:block ">GLOBAL NONPROFIT FINANCING</p>
      </h1>
      <Image src={hero} className="order-3 row-span-2 rounded-lg" />
      <p className="order-2 lg:order-3 text-[1.13rem] lg:text-2xl w-full leading-relaxed text-center lg:text-left">
        Nonprofit fundraising hasn’t changed much for the last hundred years.
        But the world has. We provide nonprofits with new tools to raise,
        coordinate and invest funds. With Better Giving, impact is amplified.
        Funding goes further. Connections run deeper and access is available to
        all.{" "}
        <span className="md:leading-normal xl:leading-relaxed font-bold">
          Donate below.
        </span>
      </p>
    </div>
  );
}
