import { GlobeIcon, LayoutPanelLeftIcon, SproutIcon } from "lucide-react";
import { NavLink, href } from "react-router";

export function Items({ classes = "" }) {
  return (
    <div
      className={`${classes} grid md:grid-cols-3 gap-8`}
      aria-label="Key offerings"
    >
      <article className="grid p-4 pb-8 border border-blue-l5/30 rounded justify-items-center">
        <LayoutPanelLeftIcon aria-hidden="true" />
        <h3 className="mt-2 capitalize text-center font-bold text-lg md:text-xl">
          All-In-One Giving Form
        </h3>
        <p className="text-center mt-4 text-lg">
          Raise more with a conversion-optimized form—cash, stock, crypto, and
          DAF in one flow.
        </p>
        <NavLink
          to={href("/donation-forms")}
          className="mt-4 text-blue hover:underline"
        >
          Learn more
        </NavLink>
      </article>
      <article className="grid p-4 pb-8 border border-blue-l5/30 rounded justify-items-center">
        <SproutIcon className="stroke-green" size={26} aria-hidden="true" />
        <h3 className="mt-2 capitalize text-center font-bold text-lg md:text-xl">
          Faithful Fund Management
        </h3>
        <p className="text-center mt-4 text-lg">
          Turn today's gifts into tomorrow's reserves with high-yield savings
          and a USCCB-aligned investment fund.
        </p>
        <NavLink
          to={href("/fund-management")}
          className="mt-4 text-blue hover:underline"
        >
          Learn more
        </NavLink>
      </article>
      <article className="grid p-4 pb-8 border border-blue-l5/30 rounded justify-items-center">
        <GlobeIcon className="stroke-blue" aria-hidden="true" />
        <h3 className="mt-2 capitalize text-center font-bold text-lg md:text-xl">
          Global Fiscal Sponsorship
        </h3>
        <p className="text-center mt-4 text-lg">
          Support mission work and sister parishes outside the U.S. with
          compliant U.S. receipting.
        </p>
        <NavLink
          to={href("/fiscal-sponsorship")}
          className="mt-4 text-blue hover:underline"
        >
          Learn more
        </NavLink>
      </article>
    </div>
  );
}
