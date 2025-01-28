import { brands } from "content/brands";

export default function FellowNonProfits({ className = "" }) {
  return (
    <section className={`${className} grid`}>
      <h2 className="text-center text-3xl/tight md:text-4.5xl/tight text-gray-d4 text-pretty mb-16 px-4">
        Over $6 million donations <br /> processed for nonprofits worldwide
      </h2>
      <div className="flex items-center flex-wrap justify-center gap-4 xl:container xl:mx-auto px-5">
        {brands.map((b, idx) => (
          <img
            key={idx}
            src={b}
            alt="brand img"
            width={120}
            className="object-contain mx-6"
          />
        ))}
      </div>
    </section>
  );
}
