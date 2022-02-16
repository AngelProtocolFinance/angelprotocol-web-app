import { NavLink, useHistory, useParams } from "react-router-dom";
import { charityNav } from "./constants";

type CharityParams = {
  address: string;
};

export default function CharityInfoNav() {
  const { address } = useParams<CharityParams>();
  const {
    location: { pathname },
  } = useHistory();

  const getClassNames = (isActive: boolean, isDisabled: boolean = false) => {
    const classes = `flex justify-center w-full ${
      isDisabled
        ? "text-white-grey bg-grey-accent"
        : isActive
        ? "bg-angel-blue text-white"
        : "text-dark-grey text-white text-opacity-80 hover:bg-angel-blue hover:text-white"
    }  font-semibold bg-white uppercase border-0 py-3 px-6`;
    return classes;
  };

  return (
    <nav className="max-w-full overflow-hidden scroll-hidden grid items-start justify-stretch lg:padded-container my-5 lg:mb-0 md:pl-0">
      <ul className="flex font-body text-sm lg:text-base ml-1 block w-full overflow-hidden overflow-x-auto scroll-hidden">
        {charityNav.map((navItem, i) => (
          <li className="flex block min-w-200" key={i}>
            {/**just use buttons since page switching is programmatic and no involved page semantics*/}
            {navItem.disabled ? (
              <button className={getClassNames(false, true)}>
                {navItem.title}
              </button>
            ) : (
              <NavLink
                className={(isActive) => {
                  const active = navItem?.isDefault
                    ? navItem?.defaultPath(address) === pathname || isActive
                    : isActive;
                  return getClassNames(active, navItem.disabled);
                }}
                to={navItem.getLink(address)}
              >
                {navItem.title}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
