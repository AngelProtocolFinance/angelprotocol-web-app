import Image from "components/image";
import hero from "./hero.png";
export function Hero({ classes = "" }) {
  return (
    <section
      className={`${classes} grid justify-items-center gap-10 xl:justify-items-start xl:grid-cols-2 py-12`}
    >
      <div className="max-w-2xl order-2 xl:order-1">
        <h4 className="text-center xl:text-left xl:text-lg uppercase text-white mb-5">
          Save More. Raise More. Do More.
        </h4>
        <h1 className="text-center text-white xl:text-left text-4.5xl xl:text-5xl xl:leading-tight text-balance mb-4">
          Unlock the Full Potential of Your Donations.
        </h1>
        <p className="text-lg xl:text-xl text-center xl:text-left text-white">
          See how your nonprofit can save more, raise more, and grow donations
          through smarter processing and automated investing.
        </p>
      </div>
      <Image
        src={hero}
        width={500}
        className="rounded-4xl order-1 xl:order-2 justify-self-center"
      />
    </section>
  );
}
