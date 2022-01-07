export default function CharityInfoNav({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: any;
}) {
  const getClassNames = (tab: string) => {
    const isActive = activeTab === tab;
    const classes = `inline-block 2xl:w-52 disabled:bg-grey-accent disabled:text-white-grey ${
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
    <nav className="overflow-y-hidden overflow-x-hidden scroll-hidden grid grid-cols-a1a items-center justify-between md:justify-items-center xl:padded-container mt-5 mb-0 md:mb-5 xl:mb-0 px-3 md:px-0">
      <ul className="flex font-body text-xs md:text-sm lg:text-base ml-1">
        <li className="mr-1 flex md:mb-1">
          {/**just use buttons since page switching is programmatic and no involved page semantics*/}
          <button
            className={getClassNames("overview")}
            onClick={handleLinkClick("overview")}
          >
            Overview
          </button>
        </li>
        <li className="mr-1 md:mb-1">
          <button
            className={getClassNames("endowment")}
            onClick={() => onTabChange("endowment")}
          >
            endowment
          </button>
        </li>
        <li className="mr-1 md:mb-1">
          <button
            disabled
            className={getClassNames("programs")}
            onClick={() => onTabChange("programs")}
          >
            Programs
          </button>
        </li>
        <li className="mr-1 md:mb-1 hidden sm:block">
          <button
            disabled
            className={getClassNames("media")}
            onClick={() => onTabChange("media")}
          >
            News/media
          </button>
        </li>
        <li className="mr-1 md:mb-1 hidden md:block">
          <button
            disabled
            className={getClassNames("governance")}
            onClick={() => onTabChange("governance")}
          >
            governance (dano)
          </button>
        </li>
      </ul>
    </nav>
  );
}
