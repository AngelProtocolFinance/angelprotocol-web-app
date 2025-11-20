import { GlobeIcon, LayoutPanelLeftIcon, SproutIcon } from "lucide-react";
import { NavLink, href } from "react-router";

export function Items({ classes = "" }) {
  return (
    <div
      className={`${classes} grid md:grid-cols-3 gap-8`}
      aria-label="Key offerings"
    >
      <article className="grid p-4 pb-8 rounded-lg shadow-xl shadow-gray-l4 border-t border-gray-l4 justify-items-center">
        <LayoutPanelLeftIcon aria-hidden="true" />
        <h3 className="mt-2 capitalize text-center font-bold text-lg md:text-xl">
          All-in one donation form
        </h3>
        <p className="text-center mt-4 text-lg">
          Raise more with a conversion-optimized form-cash, stock, and crypto in
          one flow.
        </p>
        <NavLink
          to={href("/donation-forms")}
          className="mt-4 text-blue hover:underline"
        >
          Learn more
        </NavLink>
      </article>
      <article className="grid p-4 pb-8 rounded-lg shadow-xl shadow-gray-l4 border-t border-gray-l4 justify-items-center">
        <SproutIcon className="stroke-green" size={26} aria-hidden="true" />
        <h3 className="mt-2 capitalize text-center font-bold text-lg md:text-xl">
          Sustainability fund management
        </h3>
        <p className="text-center mt-4 text-lg">
          Turn today's gifts into tomorrow's reserves with Savings and a pooled
          Growth Fund.
        </p>
        <NavLink
          to={href("/fund-management")}
          className="mt-4 text-blue hover:underline"
        >
          Learn more
        </NavLink>
      </article>
      <article className="grid p-4 pb-8 rounded-lg shadow-xl shadow-gray-l4 border-t border-gray-l4 justify-items-center">
        <GlobeIcon className="stroke-blue" aria-hidden="true" />
        <h3 className="mt-2 capitalize text-center font-bold text-lg md:text-xl">
          Fiscal sponsorship
        </h3>
        <p className="text-center mt-4 text-lg">
          Accept U.S. tax-deductible donations globally without legal or tax
          barriers.
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
