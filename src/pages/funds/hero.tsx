import Image from "components/image";
import hero from "./hero.webp";

export default function Hero({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`${classes} grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 justify-items-center lg:content-start`}
    >
      <div className="self-center">
        <p className="max-lg:text-center uppercase mb-2 text-white font-bold font-heading">
          Raise Funds. Fuel Impact
        </p>
        <h1 className="text-white mb-4 capitalize text-center text-2xl lg:text-4xl text-pretty lg:text-left">
          Fundraising, The&nbsp;Better&nbsp;Giving Way
        </h1>

        <p className="text-white text-xl lg:text-2xl max-lg:text-center text-balance ">
          Fundraisers that Support One or Several Nonprofits. Every Donation
          goes where you want it to.
        </p>
      </div>

      <Image width={600} src={hero} className="rounded-4xl" />
    </div>
  );
}
