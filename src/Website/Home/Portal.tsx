import { Link } from "react-router-dom";
import { webRoutes } from "constants/routes";

export default function Portal() {
  return (
    <section className="grid place-items-center bg-portal bg-no-repeat w-full bg-cover bg-center h-80 px-5 sm:px-0">
      <div className="grid justify-items-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-white-grey mb-10">
          Transform how your charity fundraises today
        </h3>
        <Link
          to={webRoutes.contact}
          className="text-center bg-angel-orange hover:bg-orange text-lg sm:text-xl lg:text-2xl py-1 px-2 lg:py-2 lg:px-5 rounded-sm text-white-grey font-semibold shadow-md"
        >
          I want to register!
        </Link>
      </div>
    </section>
  );
}
