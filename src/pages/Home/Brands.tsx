import { brands } from "content/brands";
import Marquee from "react-fast-marquee";

const Brands = () => {
  return (
    <section className="grid content-start gap-14 bg-gradient-to-b from-transparent to-peach/20">
      <h2 className="text-[32px] md:text-[42px] text-navy-d4 px-8 text-center max-w-lg mx-auto text-balance">
        Trusted by impactful nonprofits worldwide
      </h2>
      <Marquee
        pauseOnHover
        className="[&_.rfm-initial-child-container]:gap-x-12"
      >
        {brands
          .concat(brands)
          .concat(brands)
          .concat(brands)
          .map((b, idx) => (
            <img key={idx} src={b} height={80} alt="brand img" />
          ))}
      </Marquee>
    </section>
  );
};

export default Brands;
