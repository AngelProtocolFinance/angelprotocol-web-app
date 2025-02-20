import { Link } from "@remix-run/react";
import logo from "assets/images/bg-logo.webp";
import Image from "components/image";
import { appRoutes } from "constants/routes";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} relative grid md:grid-cols-[3fr_1fr] bg-linear-to-br from-blue-d1 to-white rounded-3xl md:rounded-4xl px-10 py-12 md:px-16 md:py-[4.5rem]`}
    >
      <div className="order-2 md:order-1">
        <h4 className="text-center md:text-left uppercase [28rem]:text-lg text-white leading-normal mb-6">
          Simple. Sustainable. Free.
        </h4>
        <h3 className="text-center md:text-left md:leading-snug font-heading text-xl @md:text-3xl text-white mb-9">
          Stop paying for what should be free
        </h3>
        <Link
          to={appRoutes.register}
          className="btn-blue active:translate-x-1 font-heading uppercase font-bold shadow-2xl rounded-full px-6 py-2 md:px-10 md:py-4"
        >
          Start today
        </Link>
      </div>
      <Image
        alt="Letters B & G forming a circle like 8"
        width={140}
        src={logo}
        className="place-self-center mb-8 order-1 md:order-2"
      />
    </div>
  );
}
