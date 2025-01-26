import { brands } from "content/brands";

const Brands = () => {
  return (
    <section className="grid content-start gap-14">
      <h2 className="text-3xl/tight md:text-4.5xl/tight text-navy-d4 px-8 text-center max-w-lg mx-auto text-balance">
        Over $6M raised for nonprofits worldwide
      </h2>
      <div className="flex items-center flex-wrap justify-center gap-4 padded-container">
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
};

export default Brands;
