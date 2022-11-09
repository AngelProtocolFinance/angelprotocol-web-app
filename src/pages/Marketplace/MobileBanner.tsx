import character from "assets/images/character2.png";

export default function MobileBanner({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`${classes} content-start pt-28 justify-items-center padded-container text-white `}
    >
      <h1 className="text-center font-extrabold max-w-md text-3xl md:text-[1.625rem]">
        <div className="leading-tight">ANGEL PROTOCOL SUPPORTS</div>
        <div className="leading-tight text-orange">DISPLACED UKRAINIANS.</div>
      </h1>
      <p className="text-center text-lg max-w-xl leading-relaxed mt-4 -mb-6">
        Ongoing conflict has led to a humanitarian crisis in Ukraine that could
        displace over 7 million people. Fund relief &amp; refugee efforts by
        donating crypto assets today!
      </p>
      <img src={character} alt="" className="w-full max-w-md" />
    </div>
  );
}
