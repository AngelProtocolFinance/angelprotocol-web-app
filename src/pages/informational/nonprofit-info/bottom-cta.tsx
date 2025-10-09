import laira_laptop from "assets/laira/laira-laptop.webp";
import laira_shake_hands from "assets/laira/laira-shaking-hands.webp";
import { Image } from "components/image";

import { BOOK_A_DEMO } from "constants/env";
import { Link, href } from "react-router";

export function BottomCta({ className = "" }) {
  return (
    <div className={`${className} grid @4xl:grid-cols-2 gap-4`}>
      <h4 className="col-span-full text-lg text-blue-d1 uppercase text-center">
        Simple. Sustainable. Free.
      </h4>
      <h2 className="col-span-full text-center text-3xl @4xl:text-4xl leading-snug max-w-2xl justify-self-center mb-12">
        The all-in-one fundraising solution you deserve is only a few clicks
        away
      </h2>

      <CtaCard
        className="from-blue-d1 "
        title="Ready to unlock your fundraising potential?"
        to={{ href: href("/register/welcome"), title: "Get started" }}
        img={{ src: laira_shake_hands, width: 140 }}
      />
      <CtaCard
        className="from-gray-d1"
        title="Want to learn more first?"
        to={{ href: BOOK_A_DEMO, title: "Book a demo" }}
        img={{ src: laira_laptop, width: 70 }}
      />
    </div>
  );
}

interface ICtaCard {
  className?: string;
  title: string;
  to: { href: string; title: string };
  img: { src: string; width: number };
}
export function CtaCard({ className = "", title, to, img }: ICtaCard) {
  return (
    <div
      className={`${className} grid @md:grid-cols-2 w-full bg-linear-to-br to-transparent p-6 rounded-xl`}
    >
      <h3 className="@3xl:text-left text-white @3xl:leading-snug  text-xl @sm:text-2xl mb-4 col-span-full">
        {title}
      </h3>
      <Link
        to={to.href}
        className="btn-blue uppercase font-bold  shadow-xl active:translate-x-1 rounded-full px-6 py-3 self-start justify-self-start"
      >
        {to.title}
      </Link>
      <Image
        width={img.width}
        src={img.src}
        className="justify-self-end mt-8"
      />
    </div>
  );
}
