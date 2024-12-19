import Image from "components/Image";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";
import { benefits } from "content/benefits";
import { useRendered } from "hooks/use-rendered";
import { Link } from "react-router-dom";

export function Top({ className = "" }) {
  useRendered();
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @6xl:grid-cols-[3fr_2fr] py-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1 grid">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-blue-d1 mb-5">
          Setup Today, Grow Forever
        </h4>
        <h1 className="text-center @6xl:text-left text-4.5xl @6xl:text-6xl @6xl:leading-tight text-balance mb-4 text-navy-d4">
          Simplify Fundraising, Maximize Impact
        </h1>
        <p className="text-lg @6xl:text-xl text-center @6xl:text-left">
          Better Giving streamlines donations, simplifies administration, and
          helps your nonprofit grow its funds—all through an easily embeddable
          donation form.
        </p>
        <ul className="pl-5 my-8 text-lg @6xl:text-xl space-y-4 text-center @6xl:text-left list-disc list-outside">
          <li>
            Accept donations seamlessly: credit card, crypto, stock, and DAF
            gifts—<span className="font-bold">ZERO PLATFORM FEES</span>.
          </li>
          <li>
            Simplify operations with automated tax reporting and customizable
            forms.
          </li>
          <li>
            Grow funds sustainably with high-yield savings and investment
            options.
          </li>
        </ul>

        <div className="flex flex-col @sm:flex-row justify-center @6xl:justify-start items-center gap-6 mt-6">
          <Link
            to={appRoutes.register}
            className="px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 bg-blue-d1 active:translate-x-1 text-white font-heading uppercase font-bold shadow-2xl rounded-full"
          >
            Start today
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="uppercase bg-white border-blue-d1 text-blue-d1 active:translate-x-1 font-bold font-heading border-2 rounded-full px-6 py-2 @6xl:px-8 @6xl:py-4 @6xl:text-xl hover:shadow-2xl hover:shadow-blue/50"
          >
            Book a Demo
          </Link>
        </div>
      </div>
      <Image
        src={benefits.donors[1].img}
        width={600}
        height={600}
        className="rounded-full order-1 @6xl:order-2 w-96 @6xl:w-auto shadow-2xl shadow-black/20"
      />
    </section>
  );
}

function Tooltip({ className = "" }) {
  return (
    <span className={`text-navy-d4 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="82"
        height="45"
        viewBox="0 0 82 45"
        fill="none"
      >
        <path
          d="M78.6531 43.6601C79.0178 44.404 79.9164 44.7114 80.6602 44.3468C81.4041 43.9821 81.7115 43.0835 81.3469 42.3396L78.6531 43.6601ZM0.750315 12.1702C0.292122 12.8603 0.480187 13.7913 1.17037 14.2495L12.4175 21.7161C13.1077 22.1743 14.0387 21.9863 14.4969 21.2961C14.955 20.6059 14.767 19.675 14.0768 19.2168L4.07932 12.5797L10.7164 2.58225C11.1746 1.89207 10.9865 0.961128 10.2963 0.502936C9.60613 0.0447435 8.67518 0.232808 8.21699 0.92299L0.750315 12.1702ZM81.3469 42.3396C75.0449 29.4838 67.7273 19.1122 55.5168 13.3317C43.3394 7.56684 26.583 6.50333 1.70298 11.5295L2.29702 14.4701C26.917 9.49647 42.9106 10.6831 54.2332 16.0432C65.5227 21.3877 72.4551 31.0161 78.6531 43.6601L81.3469 42.3396Z"
          fill="#183244"
        />
      </svg>
      <p className="text-navy-d4 translate-x-12 -rotate-[12deg] font-gochi text-nowrap">
        It’s totally free!
      </p>
    </span>
  );
}
