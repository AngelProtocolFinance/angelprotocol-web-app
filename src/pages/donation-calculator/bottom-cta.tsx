import { Link } from "@remix-run/react";
import { laira } from "assets/laira/laira";
import Image from "components/image";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";

export function BottomCta({ className = "" }) {
  return (
    <div className={`${className} grid gap-4`}>
      <CtaCard
        className="from-blue-d1 "
        title="Ready to unlock your fundraising potential?"
        to={{ href: appRoutes.register, title: "Get started" }}
        img={{
          src: laira.shakeHands,
          width: 140,
          alt: "laira shaking hands with another character",
        }}
      />
      <CtaCard
        className="from-gray-d1"
        title="Want to learn more first?"
        to={{ href: BOOK_A_DEMO, title: "Book a demo" }}
        img={{
          src: laira.calling,
          width: 80,
          alt: "laira holding a phone to her ear",
        }}
      />
    </div>
  );
}

interface ICtaCard {
  className?: string;
  title: string;
  to: { href: string; title: string };
  img: { src: string; width: number; alt: string };
}
export function CtaCard({ className = "", title, to, img }: ICtaCard) {
  return (
    <div
      className={`${className} grid @md:grid-cols-2 w-full bg-linear-to-br to-transparent p-6 rounded-xl`}
    >
      <h3 className="@3xl:text-left text-white @3xl:leading-snug font-heading text-xl @sm:text-2xl mb-4 col-span-full">
        {title}
      </h3>
      <Link
        to={to.href}
        className="btn-blue uppercase font-bold font-heading shadow-xl active:translate-x-1 rounded-full px-6 py-3 self-start justify-self-start"
      >
        {to.title}
      </Link>
      <Image
        width={img.width}
        src={img.src}
        alt={img.alt}
        className="justify-self-end mt-8"
      />
    </div>
  );
}
