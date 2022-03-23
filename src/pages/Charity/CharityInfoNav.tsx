import { NavLink } from "react-router-dom";
import { charity } from "constants/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import ScrollableTabs from "./ScrollableTabs";

export default function CharityInfoNav() {
  return (
    <nav className="relative max-w-full overflow-hidden scroll-hidden grid items-start justify-stretch lg:padded-container my-5 lg:mb-0 md:pl-0">
      <ScrollableTabs>
        <NavLink to={charity.overview} className={styler}>
          overview
        </NavLink>
        <NavLink to={charity.endowment} className={styler}>
          endowments
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
  "block w-full text-dark-grey text-angel-grey hover:bg-angel-blue hover:text-white font-semibold bg-white uppercase py-3 px-6",
  "bg-angel-blue text-white"
);

const disabledClass =
  "block w-full text-white-grey font-semibold bg-grey-accent uppercase py-3 px-6 pointer-events-none";
