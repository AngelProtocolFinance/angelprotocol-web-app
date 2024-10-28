import { laira } from "assets/laira/laira";
import Image from "components/Image";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";

export function BottomCta({ className = "" }) {
  return (
    <div className={`${className} grid @4xl:grid-cols-2 gap-4`}>
      <h4 className="col-span-full text-lg text-blue-d1 uppercase text-center">
        Simple. Sustainable. Free.
      </h4>
      <h2 className="col-span-full text-center text-4xl leading-snug max-w-2xl justify-self-center mb-4">
        The all-in-one fundraising solution you deserve is only a few clicks
        away
      </h2>

      <CtaCard
        className="from-blue-d1 "
        title="Ready to unlock your fundraising potential?"
        to={{ href: appRoutes.register, title: "Get started" }}
        img={{ src: laira.negotiating, width: 140 }}
      />
      <CtaCard
        className="from-navy"
        title="Want to learn more first?"
        to={{ href: BOOK_A_DEMO, title: "Book a demo" }}
        img={{ src: laira.laptop, width: 70 }}
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
      className={`${className} grid @md:grid-cols-2 w-full bg-gradient-to-br to-transparent p-6 rounded-xl`}
    >
      <h3 className="@3xl:text-left text-white @3xl:leading-snug font-heading text-xl @sm:text-2xl mb-4 col-span-full">
        {title}
      </h3>
      <Link
        to={to.href}
        className="btn-blue rounded-full px-6 py-3 self-start justify-self-start"
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
