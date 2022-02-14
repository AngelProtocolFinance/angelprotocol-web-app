import { NavLink, useHistory, useParams } from "react-router-dom";
import { app, site } from "types/routes";

type CharityParams = {
  address: string;
};

export default function CharityInfoNav() {
  const { address } = useParams<CharityParams>();
  const {
    location: { pathname },
  } = useHistory();

  const getClassNames = (isActive: boolean, isDisabled: boolean = false) => {
    const classes = `block w-full ${
      isDisabled
        ? "text-white-grey bg-grey-accent"
        : isActive
        ? "bg-angel-blue text-white"
        : "text-dark-grey text-white text-opacity-80 hover:bg-angel-blue hover:text-white"
    }  font-semibold bg-white uppercase border-0 py-3 px-4`;
    return classes;
  };

  return (
    <nav className="overflow-y-hidden overflow-x-scroll scroll-hidden grid items-start justify-stretch lg:padded-container my-5 lg:mb-0 md:pl-0">
      <ul className="grid sm:flex font-body text-sm lg:text-base ml-1 block w-full">
        {charityNav.map((navItem, i) => (
          <li className="mr-1 flex block w-full mb-2 md:mb-0" key={i}>
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

type CharityNavProps = {
  title: string;
  disabled: boolean;
  getLink: (address: string) => string;
  isDefault?: boolean;
  defaultPath: (address: string) => string;
};

const charityNav: CharityNavProps[] = [
  {
    title: "overview",
    disabled: false,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}/overview`,
    isDefault: true,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "endowment",
    disabled: false,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}/endowment`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "programs",
    disabled: true,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}/programs`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "media",
    disabled: true,
    getLink: (address: string) => `${site.app}/${app.charity}/${address}/media`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
  {
    title: "governance",
    disabled: true,
    getLink: (address: string) =>
      `${site.app}/${app.charity}/${address}/governance`,
    defaultPath: (address: string) => `${site.app}/${app.charity}/${address}`,
  },
];
