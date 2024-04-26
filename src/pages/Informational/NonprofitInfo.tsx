// import ExtLink from "components/ExtLink";
import Image from "components/Image";
import { INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import Brands from "../Home/Brands";
import Testimonials from "../Home/Testimonials";

export default function NonprofitInfo() {
  return (
    <div className="w-full grid content-start pb-16">
      {/* Hero section */}
      <div className="grid sm:grid-cols-2 gap-4 padded-container justify-items-center lg:content-start pt-20 pb-20">
        <div className="order-1">
          <h1 className="text-3xl text-center">
            Fundraising made simple,
            <br className="hidden lg:flex" />
            sustainable, and entirely free
          </h1>
          <p className="text-navy-l1 pt-5 font-normal w-full text-2xl text-center">
            Accept any type of donation, anywhere in the world
          </p>
          <div className="grid grid-cols-2 gap-4 pt-10">
            <Link to={appRoutes.register} className="btn-blue btn-donate">
              Start Today
            </Link>
            <Link to={INTERCOM_HELP} className="btn-outline-gray btn-donate">
              Book A Demo
            </Link>
          </div>
        </div>
        <div className="order-2">
          <Image src="/images/hero.png" className="rounded-lg align-center" />
        </div>
      </div>
      <Brands />
      {/* Features Section 1 */}
      <div className="mb-20">
        {/* TODO: Pull this span out into reusable section header component */}
        <span className="flex flex-col items-center gap-3 mb-10">
          <p className="text-md uppercase font-bold text-blue-d1 font-heading">
            Your All-In-One Donation Form
          </p>
          <h2 className="text-3xl lg:w-full md:w-8/12 text-center capitalize font-bold text-navy-d4 font-heading">
            Easily accept all types of donations
          </h2>
        </span>
        <div className="grid sm:grid-cols-2 gap-4 padded-container justify-items-center lg:content-start">
          <div className="order-1">
            <Image
              src="/images/donation-form.png"
              className="rounded-lg align-center"
            />
          </div>
          <div className="order-2 grid grid-cols-1 items-center">
            <div className="featureBlurb">
              <div className="font-bold text-lg">Quick, simple setup</div>
              Register in minutes, we’ll review and get you started right away
            </div>
            <div className="featureBlurb">
              <div className="font-bold text-lg">Never miss a donation</div>
              Accept cash, stocks, crypto, and DAF gifts all in one
              donor-friendly form
            </div>
            <div className="featureBlurb">
              <div className="font-bold text-lg">Increase funds raised</div>
              Choose to have your donations invested to provide sustainable
              funding
            </div>
            <div className="featureBlurb">
              <div className="font-bold text-lg">Fundraise for free</div>
              100% free. No setup costs, no recurring charges, no platform fees
              of any kind
            </div>
          </div>
        </div>
      </div>
      {/* Features Section 2 */}
      <div className="mb-20">
        <span className="flex flex-col items-center gap-3 mb-10 ">
          <p className="text-md uppercase font-bold text-blue-d1 font-heading">
            Bridge to better
          </p>
          <h2 className="text-3xl lg:w-full md:w-8/12 text-center capitalize font-bold text-navy-d4 font-heading">
            Why Better Giving?
          </h2>
        </span>
        <div className="grid sm:grid-cols-3 gap-4 padded-container justify-items-center lg:content-start">
          {/* TODO: Pull out into a generic feature-card conponent */}
          <div className="relative overflow-clip rounded-lg border border-gray-l4 hover:border-blue dark:hover:border-blue">
            <div className="flex flex-col p-3 pb-4 justify-between gap-3 text-center">
              <p className="text-xl font-bold text-blue-d2">Trust</p>
              <p className="text-lg text-navy">
                Built by a nonprofit, for nonprofits
              </p>
              <p className="text-md text-navy-l1">
                We understand your pain points firsthand, which is how we’ve
                helped causes in over 30 countries raise more than $6 million in
                donations and why we offer our services for free
              </p>
            </div>
          </div>
          <div className="relative overflow-clip rounded-lg border border-gray-l4 hover:border-blue dark:hover:border-blue">
            <div className="flex flex-col p-3 pb-4 justify-between gap-3 text-center">
              <p className="text-xl font-bold text-blue-d2">Simplicity</p>
              <p className="text-lg text-navy">Less admin work, more funding</p>
              <p className="text-md text-navy-l1">
                You easily accept all types of donations, we process and grant
                them out to you while managing all accounting and liability. We
                remove the hassle of raising crypto, stock, and DAF funding.
              </p>
            </div>
          </div>
          <div className="relative overflow-clip rounded-lg border border-gray-l4 hover:border-blue dark:hover:border-blue">
            <div className="flex flex-col p-3 pb-4 justify-between gap-3 text-center">
              <p className="text-xl font-bold text-blue-d2">Sustainability</p>
              <p className="text-lg text-navy">
                Financial security at your fingertips
              </p>
              <p className="text-md text-navy-l1">
                With our innovative Sustainability Fund, you can allow donor
                gifts to be invested for growth, providing a reliable and
                growing income stream to provide not just today, but forever
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials section */}
      <Testimonials />
      {/* CTA banner */}
    </div>
  );
}
