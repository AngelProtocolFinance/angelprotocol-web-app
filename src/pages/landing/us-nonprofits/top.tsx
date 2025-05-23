import { useLocation } from "@remix-run/react";
import { laira } from "assets/laira/laira";
import Image from "components/image";
import { benefits } from "content/benefits";
import { ArrowRight } from "lucide-react";

export function Top({ className = "" }) {
  const location = useLocation();
  const is_page_b = location.pathname.endsWith("s");
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @6xl:grid-cols-2 pt-12 pb-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1 grid">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-blue-d1 mb-5">
          Setup Today, Grow Forever
        </h4>
        <h1 className="text-center @6xl:text-left text-4xl @6xl:text-5xl @6xl:leading-tight text-balance mb-4 text-gray-d4">
          Simplify Fundraising, Maximize Impact
        </h1>
        <ul className="pl-5 my-4 text-lg @6xl:text-xl space-y-4 text-center @6xl:text-left list-disc list-outside">
          <li>
            Accept donations seamlessly: credit card, crypto, stock, and DAF
            gifts —
            <span className="font-bold">Zero&nbsp;Platform&nbsp;Fees</span>.
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

        <div
          className={`mt-8 isolate z-10 justify-self-center ${is_page_b ? "" : "@6xl:justify-self-start"}  relative`}
        >
          <button
            type="button"
            onClick={async () => {
              const dest = document.getElementById("claim-nonprofit");
              dest?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-blue ml-1 group active:translate-x-1 font-bold shadow-2xl inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg font-heading"
          >
            Claim Your Account Now
            <ArrowRight size={18} className="group-hover:translate-x-1" />
          </button>
          <Tooltip className="max-sm:hidden absolute left-[110%] top-3" />
          {is_page_b && (
            <div className="absolute top-1.5 max-sm:hidden -left-15 isolate">
              <Image
                src={laira.pointing}
                width={80}
                className="z-10 max-sm:w-24"
              />
              {/** shadow */}
              <svg className="absolute -bottom-3 z-0" width="100%" height="20">
                <defs>
                  <filter id="blur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                  </filter>
                </defs>
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="40"
                  ry="6"
                  filter="url(#blur)"
                  className="fill-gray-l3"
                  // className="blur-sm"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <Image
        src={benefits.donors[1].img}
        width={500}
        height={500}
        className="rounded-full justify-self-center self-center order-1 @6xl:order-2 w-96 @6xl:w-auto shadow-2xl shadow-black/20"
      />
    </section>
  );
}

function Tooltip({ className = "" }) {
  return (
    <span className={`text-gray-d4 ${className}`}>
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
      <p className="text-gray-d4 translate-x-12 -rotate-[12deg] font-gochi text-nowrap">
        It’s totally free!
      </p>
    </span>
  );
}
