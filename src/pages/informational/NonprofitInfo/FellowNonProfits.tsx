import { brands } from "content/brands";
import Marquee from "react-fast-marquee";

export default function FellowNonProfits({ className = "" }) {
  return (
    <section className={`${className} grid`}>
      <h2 className="text-center text-3xl/tight md:text-4.5xl/tight text-navy-d4 text-pretty mb-16 px-4">
        Over $6 million donations <br /> processed for nonprofits worldwide
      </h2>
      <Marquee pauseOnHover autoFill>
        {brands.map((b, idx) => (
          <img
            key={idx}
            src={b}
            alt="brand img"
            width={120}
            className="object-contain mx-6"
          />
        ))}
      </Marquee>
    </section>
  );
}
