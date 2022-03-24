import { NavLink } from "react-router-dom";
import { charity } from "constants/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import ScrollableTabs from "./ScrollableTabs";

export default function CharityInfoNav() {
  return (
    <nav className="relative max-w-full overflow-hidden scroll-hidden grid items-start justify-stretch lg:padded-container my-5 lg:mb-0 md:pl-0">
      <ScrollableTabs>
        <NavLink end to={charity.index} className={styler}>
          overview
        </NavLink>
        <NavLink to={charity.endowment} className={styler}>
          endowment
        </NavLink>
        <NavLink to={charity.programs} className={disabledClass}>
          programs
        </NavLink>
        <NavLink to={charity.media} className={disabledClass}>
          media
        </NavLink>
        <NavLink to={charity.governance} className={disabledClass}>
          governance
        </NavLink>
      </ScrollableTabs>
    </nav>
  );
}

const styler = createNavLinkStyler(
  "block w-full text-dark-grey text-angel-grey hover:text-angel-orange font-semibold bg-white uppercase py-3 px-6",
  "bg-angel-blue text-white pointer-events-none"
);

const disabledClass =
  "block w-full text-white-grey font-semibold bg-grey-accent uppercase py-3 px-6 pointer-events-none";
