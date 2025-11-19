import { Link, href } from "react-router";
import { Items } from "./items";

export function Products({ classes = "" }) {
  return (
    <section
      className={`${classes} grid justify-items-center gap-10 xl:justify-items-start pb-24`}
      aria-labelledby="fundraising-section-heading"
    >
      <div className="grid">
        <p className="text-center uppercase mb-5 pre-heading text-blue">
          Everything you need, already included.
        </p>
        <h2
          id="fundraising-section-heading"
          className="text-center section-heading mb-4"
        >
          Raise funds easily. <br /> Grow them effortlessly.
        </h2>
        <p className="mb-10 text-center">
          From high-converting giving forms to Catholic fund management and
          global fiscal sponsorship for mission work, Offeria is built by and
          for the Church faithful. Free forever—no platform or fund-management
          fees.
        </p>

        <Link
          to={href("/register/welcome")}
          className="btn btn-blue justify-self-center normal-case px-10 py-3 xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-bold shadow-2xl rounded"
        >
          Sign Up Now
        </Link>
      </div>

      <Items classes="" />
    </section>
  );
}
