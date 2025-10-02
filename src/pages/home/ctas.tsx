import girl_pointing_up from "assets/landing/girl-pointing-up.webp";
import girl_using_phone from "assets/landing/girl-using-phone.webp";
import girl_watering_plant from "assets/landing/girl-watering-plant.webp";
import hand_payment_methods from "assets/landing/hand-payment-methods.webp";
import { app_routes } from "constants/routes";
import { Link } from "react-router";

interface IBlurImg {
  classes?: string;
  url: string;
}
function BlurImg({ classes, url }: IBlurImg) {
  return (
    <div className={`${classes} relative w-64 h-64`}>
      <img
        width={400}
        src={url}
        className="rounded-full absolute-center blur-2xl"
      />
      <img
        width={240}
        src={url}
        className="z-10 rounded-full absolute-center"
      />
    </div>
  );
}

export function Ctas({ classes = "" }) {
  return (
    <div className={`${classes} grid gap-y-20 md:gap-y-32 px-5 md:px-24`}>
      <div className="grid md:grid-cols-2 items-center">
        <div className="grid max-md:order-2">
          <h4 className="text-2xl max-md:text-center md:text-3xl text-blue mb-2">
            We help you raise more
          </h4>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-bold">
              Conversion-optimized donation flow
            </span>
            : fewer clicks, express checkout, all gift types in one form—plus
            easy embedding to lift completion and grow monthly donors.
          </p>
          <Link
            to={app_routes.register}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </div>
        <BlurImg
          url={girl_pointing_up}
          classes="justify-self-center max-md:mb-4"
        />
      </div>
      <div className="grid md:grid-cols-2 items-center">
        <BlurImg
          url={girl_watering_plant}
          classes="justify-self-center max-md:mb-4"
        />
        <div className="grid">
          <h4 className="text-2xl md:text-3xl text-blue mb-2 max-md:text-center">
            We grow what you raise.
          </h4>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-bold">Let your donations work for you</span>:
            High-yield savings (FDIC-insured) and a managed option averaging
            over 20% annually across the last 5 years (past performance isn’t
            guaranteed).
          </p>
          <Link
            to={app_routes.register}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 items-center">
        <div className="grid max-md:order-2">
          <h4 className="text-2xl max-md:text-center md:text-3xl text-blue mb-2">
            We unlock larger gifts.
          </h4>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-bold">Stop turning donors away</span>: Accept
            stock & crypto in the same secure flow—no extra systems, no added
            admin, no extra cost, just cash in your bank account and tax
            benefits for your donors.
          </p>
          <Link
            to={app_routes.register}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </div>
        <BlurImg
          url={hand_payment_methods}
          classes="justify-self-center max-md:mb-4"
        />
      </div>
      <div className="grid md:grid-cols-2 items-center">
        <BlurImg
          url={girl_using_phone}
          classes="justify-self-center max-md:mb-4"
        />
        <div className="grid">
          <h4 className="text-2xl md:text-3xl text-blue mb-2 max-md:text-center">
            We don't take a cut.
          </h4>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-bold">
              Entirely free, all features included
            </span>
            : Processing is funded by optional donor infrastructure gifts at
            checkout so you don't pay platform fees or fund-management fees.
          </p>
          <Link
            to={app_routes.register}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </div>
      </div>
    </div>
  );
}

interface ICta {
  classes?: string;
}

export function Cta({ classes = "" }: ICta) {
  return (
    <div className={`${classes} grid md:grid-cols-2 items-center`}>
      <div className="grid order-2">
        <h4 className="text-2xl md:text-3xl text-blue mb-2">
          We help you raise more
        </h4>
        <p className="md:text-lg mb-4">
          <span className="font-bold">Conversion-optimized donation flow</span>:
          fewer clicks, express checkout, all gift types in one form—plus easy
          embedding to lift completion and grow monthly donors.
        </p>
        <Link
          to={app_routes.register}
          className="btn-blue justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
        >
          Join us today!
        </Link>
      </div>
      <div className="relative order-1">
        <img
          width={320}
          src={girl_pointing_up}
          className="rounded-full justify-self-center absolute-center blur-xl"
        />
        <img
          width={220}
          src={girl_pointing_up}
          className="z-10 rounded-full justify-self-center absolute-center"
        />
      </div>
    </div>
  );
}
