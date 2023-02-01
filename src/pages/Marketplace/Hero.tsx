import heroImage from "assets/images/bhm-hero.jpg";
import ExtLink from "components/ExtLink";

export default function Hero({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`${classes} grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 padded-container justify-items-center lg:content-start text-white`}
    >
      <h1 className="order-1 font-extrabold w-full text-[1.63rem] md:text-3xl lg:text-[2.75rem] text-center lg:text-left lg:self-end">
        <span className="lg:block leading-tight">
          Reflecting on the past,{" "}
          <span className="text-orange">building for the future</span>
        </span>
      </h1>
      <img
        src={heroImage}
        alt=""
        className="order-3 row-span-2 self-end w-[420px] aspect-square"
      />
      <p className="order-2 lg:order-3 text-[1.13rem] lg:text-2xl w-full leading-relaxed text-center lg:text-left">
        Racial bias in philanthropic giving has resulted in an underfunding of
        Black communities by $2 billion. Despite this, Black led nonprofits and
        businesses outperform when equipped with the resources needed.
        <span className="my-4 block">
          TOGETHER WE CAN CREATE A MORE JUST AND EQUITABLE FUTURE!
        </span>
        <ExtLink
          className="z-[1] inline-block rounded-md btn-orange uppercase px-4 py-2 mb-16 font-bold text-sm mt-5"
          href="https://blackhistorymonth.angelprotocol.io"
        >
          Donate Now
        </ExtLink>
      </p>
    </div>
  );
}
