import { Link } from "react-router-dom";

export default function Portal() {
  return (
    <section className="grid place-items-center bg-portal bg-no-repeat w-full bg-cover bg-center h-80">
      <div className="grid justify-items-center">
        <h3 className="text-4xl font-bold text-center text-white-grey mb-10">
          Transform how your charity fundraises today
        </h3>
        <Link
          to="/contact"
          className="text-center bg-angel-orange text-2xl py-2 px-5 rounded-sm text-white-grey font-semibold"
        >
          I want to know more!
        </Link>
      </div>
    </section>
  );
}
