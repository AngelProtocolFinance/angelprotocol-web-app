import brand1 from "assets/landing/brand_1.svg";
import brand2 from "assets/landing/brand_2.svg";
import brand3 from "assets/landing/brand_3.svg";
import brand4 from "assets/landing/brand_4.svg";
import brand5 from "assets/landing/brand_5.svg";
import brand6 from "assets/landing/brand_6.svg";
import brand7 from "assets/landing/brand_7.svg";
import Marquee from "react-fast-marquee";

const Brands = () => {
  return (
    <section className="grid content-start gap-14 bg-gradient-to-b from-transparent to-peach/20">
      <h2 className="text-[32px] md:text-[42px] text-navy-d4 px-8 text-center max-w-lg mx-auto text-balance">
        Trusted by impactful nonprofits worldwide
      </h2>
      <Marquee pauseOnHover className="h-max">
        {[
          brand1,
          brand2,
          brand3,
          brand4,
          brand5,
          brand6,
          brand7,
          brand1,
          brand2,
          brand3,
          brand4,
          brand5,
          brand6,
          brand7,
        ].map((b, idx) => (
          <img key={idx} src={b} className="" alt="brand img" />
        ))}
      </Marquee>
    </section>
  );
};

export default Brands;
