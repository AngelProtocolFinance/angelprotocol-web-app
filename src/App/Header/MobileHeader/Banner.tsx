import character from "assets/images/character2.png";

export default function Banner({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`grid content-start justify-items-center padded-container text-white ${classes}`}
    >
      <h1 className="text-center font-extrabold max-w-md text-2xl md:text-3xl lg:text-4xl">
        <div className="leading-tight">ANGEL PROTOCOL SUPPORTS</div>
        <div className="leading-tight text-orange">DISPLACED UKRAINIANS.</div>
      </h1>
      <p className="text-center text-lg lg:text-xl max-w-xl leading-relaxed font-heading mt-4 -mb-6">
        Ongoing conflict has led to a humanitarian crisis in Ukraine that could
        displace over 7 million people. Fund relief &amp; refugee efforts by
        donating crypto assets today!
      </p>
      <img src={character} alt="" className="w-full max-w-md" />
      {/* <div
        className="w-full"
        style={{
          background: `url('${character}') center / contain no-repeat`,
        }}
      /> */}
    </div>
  );
}
