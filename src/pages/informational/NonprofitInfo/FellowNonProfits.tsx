import { brands } from "content/brands";
import Marquee from "react-fast-marquee";

export default function FellowNonProfits({ className = "" }) {
  return (
    <section className={`${className} grid`}>
      <h2 className="px-2 text-center text-4xl text-navy-d4 text-pretty mb-12">
        Trusted by Fellow Nonprofits Globally
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
}
