import character from "assets/images/three-logos-white.png";

export default function Hero({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`${classes} grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 padded-container justify-items-center lg:content-start text-white`}
    >
      <h1 className="order-1 font-extrabold w-full text-[1.63rem] md:text-3xl lg:text-[2.75rem] text-center lg:text-left lg:self-end">
        <span className="lg:block leading-tight">
          Support longer, healthier lives worldwide
        </span>
      </h1>
      <img
        src={character}
        alt=""
        className="order-3 row-span-2 self-end w-[420px] aspect-square"
      />
      <p className="order-2 lg:order-3 text-[1.13rem] lg:text-2xl w-full leading-relaxed text-center lg:text-left">
        Every second, someone dies of age-related diseases such as Parkinson's
        or Alzheimer's. If your support helps shorten the timetable for curing
        these diseases by just one second, you will have saved someone's life.
        <p className="my-4">
          If you contribute now, your donation will be doubled thanks to $10K in
          matches from the Angel Alliance.
        </p>
        <div className="mt-5">
          <a
            className="z-[1] rounded-md btn-orange uppercase px-4 py-2 mb-16 mt-6 font-bold text-sm mt-5"
            target="_blank"
            href="https://longevity.angelprotocol.io"
            rel="noreferrer"
          >
            Donate Now
          </a>
        </div>
      </p>
    </div>
  );
}
