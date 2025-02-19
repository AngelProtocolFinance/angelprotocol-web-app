import { brands } from "content/brands";

export function Brands({ className = "" }) {
  return (
    <section className={`${className} grid`}>
      <h2 className="text-center text-3xl/tight md:text-4.5xl/tight text-navy-d4 text-pretty mb-16 px-4 capitalize">
        Over $6 million donations <br /> processed for nonprofits worldwide
      </h2>
      <div className="flex items-center flex-wrap justify-center gap-4 xl:container xl:mx-auto px-5">
        {brands.map((b, idx) => (
          <img
            key={idx}
            src={b}
            width={140}
            className="object-contain mx-6 hover:scale-110"
            alt="organization logo"
          />
        ))}
      </div>
    </section>
  );
}

export default Brands;
