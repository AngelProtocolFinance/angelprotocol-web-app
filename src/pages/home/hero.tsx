import banner from "assets/images/bg-banner.webp";
import { APP_NAME } from "constants/env";
import { Link, href } from "react-router";

export const Hero = ({ classes = "" }) => {
  return (
    <section
      className={`${classes} relative grid pt-36 pb-48 sm:pb-96`}
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0 -z-10 mask-b-from-30% bg-cover bg-no-repeat bg-[center_-10%] xl:bg-[center_bottom]"
        style={{ backgroundImage: `url('${banner}')` }}
        role="presentation"
        aria-hidden="true"
      />
      <p className="pre-heading uppercase text-center mb-5 tracking-wider">
        By a nonprofit, for nonprofits
      </p>
      <h1 className="mx-auto capitalize hero-heading text-center mb-8 px-6 ">
        Raise more this quarter, <br /> Grow funds together
      </h1>
      <p className="px-6 font-medium text-gray-d1 max-w-5xl mx-auto max-md:block md:text-2xl text-center sm:text-balance">
        When you sign up, you're a {APP_NAME} Member, no extra steps, no fees.
        Our high-converting donation flow lifts completed gifts and monthly
        donors. Savings and a pooled Sustainability Fund build reserves over
        time.
      </p>

      <Link
        to={href("/register/welcome")}
        className="justify-self-center mt-8 btn-blue active:translate-x-1 items-center font-bold shadow-2xl inline-flex px-10 py-3 gap-1 rounded-full text-lg "
      >
        Join us today!
      </Link>
    </section>
  );
};
