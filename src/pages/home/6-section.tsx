import { Video, videos } from "components/video/video";
import { APP_NAME } from "constants/env";
import { app_routes } from "constants/routes";
import { Link } from "react-router";

export function Section6({ classes = "" }) {
  return (
    <section
      className={`${classes} grid justify-items-center gap-10 xl:justify-items-start xl:grid-cols-2 pb-24`}
    >
      <div className="max-w-2xl order-2 xl:order-1">
        <h4 className="text-center xl:text-left xl:text-lg uppercase text-gray-d4 mb-5">
          Everything you need, already included.
        </h4>
        <h2 className="text-center xl:text-left text-4xl xl:text-4.5xl xl:leading-tight text-balance mb-4 text-gray-d4">
          Raise funds easily. <br /> Grow them effortlessly.
        </h2>
        <p className="mb-10 text-lg xl:text-xl text-center xl:text-left">
          From high-converting donation forms to growth through Savings and a
          Sustainability Fund, plus global fiscal sponsorship. {APP_NAME} is
          built by and for nonprofits. Free-no platform or fund-management fees.
        </p>

        <Link
          to={app_routes.register}
          className="btn-blue px-6 py-2 xl:px-10 xl:py-4 xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-bold shadow-2xl rounded-full"
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
