import { Video, videos } from "components/video/video";
import { APP_NAME } from "constants/env";
import { Link, href } from "react-router";

export function Section6({ classes = "" }) {
  return (
    <section
      className={`${classes} grid justify-items-center gap-10 xl:justify-items-start xl:grid-cols-2 pb-24`}
      aria-labelledby="fundraising-section-heading"
    >
      <div className="grid max-w-2xl order-2 xl:order-1">
        <p className="text-center xl:text-left uppercase mb-5 pre-heading text-blue">
          Everything you need, already included.
        </p>
        <h2
          id="fundraising-section-heading"
          className="text-center xl:text-left section-heading mb-4"
        >
          Raise funds easily. <br /> Grow them effortlessly.
        </h2>
        <p className="mb-10 text-lg xl:text-xl text-center xl:text-left">
          From high-converting donation forms to growth through Savings and a
          Sustainability Fund, plus global fiscal sponsorship. {APP_NAME} is
          built by and for nonprofits. Free-no platform or fund-management fees.
        </p>

        <Link
          to={href("/register/welcome")}
          className="btn btn-blue justify-self-center normal-case xl:justify-self-start px-10 py-3 xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-semibold shadow-2xl rounded-full"
        >
          Join us today!
        </Link>
      </div>
      <Video
        classes="max-w-2xl xl:max-w-auto order-1 xl:order-2 w-full self-center"
        vid={videos.about}
      />
    </section>
  );
}
