import david_and_goliath from "assets/images/david-and-goliath.png";
import { APP_NAME } from "constants/env";

export function Section8({ classes = "" }) {
  return (
    <section
      className={`${classes} grid justify-items-center gap-10 xl:justify-items-start xl:grid-cols-2 pb-24`}
    >
      <div className="max-w-2xl order-2 xl:order-1">
        <h2 className="text-center xl:text-left text-4xl xl:text-4.5xl xl:leading-tight text-balance mb-8 text-gray-d4">
          We’re not the biggest fundraising platform, so why go with us?
        </h2>
        <p className="mb-4 text-lg xl:text-xl text-center xl:text-left">
          We try harder. (When you’re a fellow nonprofit, you have to.)
        </p>
        <p className="mb-4 text-lg xl:text-xl text-center xl:text-left">
          We can’t afford confusing checkouts. Or hidden platform fees. Or
          charging for gated features.
        </p>
        <p className="mb-4 text-lg xl:text-xl text-center xl:text-left">
          So we help you raise more with a conversion-optimized donation flow.
          We help you grow more by accepting larger gift types and putting your
          donations to work. We help you do more by handling all the admin so
          you can concentrate on your mission. And we never charge you a dime or
          take a cut, anywhere.
        </p>
        <p className="mb-4 text-lg xl:text-xl text-center xl:text-left">
          Why? Because we can’t afford to take you for granted.
        </p>
        <p className="mb-4 text-lg xl:text-xl text-center xl:text-left">
          We’re willing to go the extra mile with you, because we understand the
          challenges of operating a nonprofit first hand. At {APP_NAME}
          you’re not simply another customer, you’re a trusted member.
        </p>
      </div>
      <img
        width={500}
        src={david_and_goliath}
        className="max-w-xl xl:max-w-auto order-1 xl:order-2 w-full self-center"
        alt="David and Goliath illustration representing how smaller nonprofits can compete"
      />
    </section>
  );
}
