export default function CharityInfoNav({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: any;
}) {
  const getClassNames = (tab: string) => {
    const isActive = activeTab === tab;
    const classes = `block w-full disabled:bg-grey-accent disabled:text-white-grey ${
      !isActive && "text-dark-grey"
    } hover:text-white hover:text-opacity-80 font-semibold bg-white uppercase border-0 py-3 px-4 hover:bg-angel-blue active:bg-angel-blue active:text-white ${
      isActive ? "bg-angel-blue text-light-grey" : ""
    }`;
    return classes;
  };
  const handleLinkClick = (destination: string) => () => {
    onTabChange(destination);
  };

  return (
    <nav className="overflow-y-hidden overflow-x-scroll scroll-hidden grid items-start justify-stretch lg:padded-container my-5 lg:mb-0 md:pl-0">
      <ul className="flex font-body text-sm lg:text-base ml-1 block w-full">
        <li className="mr-1 flex block w-full">
          {/**just use buttons since page switching is programmatic and no involved page semantics*/}
          <button
            className={getClassNames("overview")}
            onClick={handleLinkClick("overview")}
          >
            Overview
          </button>
        </li>
        <li className="mr-1 block w-full">
          <button
            className={getClassNames("endowment")}
            onClick={() => onTabChange("endowment")}
          >
            endowment
          </button>
        </li>
        {/* <li className="mr-1">
          <button
            disabled
            className={getClassNames("programs")}
            onClick={() => onTabChange("programs")}
          >
            Programs
          </button>
        </li>
        <li className="mr-1">
          <button
            disabled
            className={getClassNames("media")}
            onClick={() => onTabChange("media")}
          >
            News/media
          </button>
        </li>
        <li className="mr-1">
          <button
            disabled
            className={getClassNames("governance")}
            onClick={() => onTabChange("governance")}
          >
            governance (dano)
          </button>
        </li> */}
      </ul>
    </nav>
  );
}
