import { laira } from "assets/laira/laira";
import ExtLink from "components/ext-link";
import Image from "components/image";
import { BOOK_A_DEMO } from "constants/env";
import { ArrowRight } from "lucide-react";

export function Cta({ classes = "" }) {
  return (
    <div className={`relative ${classes}`}>
      <div className="max-xl:hidden absolute left-24 isolate top-1/2 -translate-y-1/2">
        <Image
          src={laira.yellow}
          width={90}
          height={116}
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
            fill="#e2e8f0"
            // className="blur-sm"
          />
        </svg>
      </div>
      <div className="mt-8 isolate z-10 justify-self-center relative">
        <ExtLink
          href={BOOK_A_DEMO}
          className="btn-blue ml-1 group active:translate-x-1 font-bold shadow-2xl inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg font-heading"
        >
          Book A Demo!
          <ArrowRight size={18} className="group-hover:translate-x-1" />
        </ExtLink>

        <Tooltip className="max-sm:hidden absolute left-[110%] top-3" />
      </div>
      <div className="max-xl:hidden absolute right-28 -top-20">
        <Image
          src={laira.pointing}
          width={140}
          height={177}
          className="z-10 max-sm:w-24 rotate-y-180"
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
            rx="60"
            ry="6"
            filter="url(#blur)"
            fill="#e2e8f0"
          />
        </svg>
      </div>
    </div>
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
      <p className="text-gray-d4 text-xl translate-x-12 -rotate-[12deg] font-gochi text-nowrap">
        Let's Have A Chat!
      </p>
    </span>
  );
}
