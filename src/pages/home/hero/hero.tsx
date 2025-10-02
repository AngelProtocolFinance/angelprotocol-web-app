import banner from "assets/images/bg-banner.webp";
import { app_routes } from "constants/routes";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Hero = ({ classes = "" }) => {
  return (
    <section
      className={`${classes} relative grid bg-cover bg-no-repeat bg-[center_-10%] xl:bg-[center_bottom] pt-36 pb-48 sm:pb-96`}
      style={{
        backgroundImage: `linear-gradient(to top, rgba(255,255,255) 1%, transparent), url('${banner}')`,
      }}
    >
      <p className="text-sm  md:text-lg isoalte uppercase font-bold text-center mb-5 tracking-wider">
        By a nonprofit, for nonprofits
      </p>
      <h1 className="mx-auto capitalize text-4xl/tight md:text-5xl/tight lg:text-6xl/tight text-center text-pretty mb-6 px-6 ">
        Raise more this quarter, <br /> Grow funds together
      </h1>
      <p className="px-6 font-medium text-gray-d1 max-md:block md:text-2xl text-center text-pretty sm:text-balance">
        When you sign up, you're a Better Giving Member, no extra steps, no
        fees. Our high-converting donation flow lifts completed gifts and
        monthly donors. Savings and a pooled Sustainability Fund build reserves
        over time.
      </p>

      <div className="mt-8 justify-self-center relative">
        <Link
          to={`${app_routes.register}/welcome`}
          className="btn-blue ml-1 group active:translate-x-1 font-bold shadow-2xl inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg "
        >
          Join Us Today!
          <ArrowRight size={18} className="group-hover:translate-x-1" />
        </Link>

        <Tooltip className="max-sm:hidden absolute left-[110%] top-3" />
      </div>
    </section>
  );
};

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

export default Hero;
