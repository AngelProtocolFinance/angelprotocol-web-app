export default function CharityInfoNav({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: any;
}) {
  const getClassNames = (tab: string) => {
    const isActive = activeTab === tab;
    const classes = `inline-block w-52 ${
      !isActive && "text-dark-grey"
    } hover:text-white hover:text-opacity-80 font-semibold bg-white uppercase border-0 py-3 px-4 hover:bg-angel-blue active:bg-angel-blue active:text-white ${
      isActive ? "bg-angel-blue text-light-grey" : ""
    }`;
    return classes;
  };

  return (
    <nav className=" overflow-x-scroll grid grid-cols-a1a items-center justify-between md:justify-items-center 2xl:padded-container my-5 2xl:mb-0 md:pl-0">
      <ul
        className={`flex font-body text-sm lg:text-base overflow-x-scroll ml-1 `}
      >
        <li className="mr-1 flex">
          <a
            href="##"
            className={getClassNames("overview")}
            onClick={() => onTabChange("overview")}
          >
            Overview
          </a>
        </li>
        <li className="mr-1">
          <a
            href="##"
            className={getClassNames("endowment")}
            onClick={() => onTabChange("endowment")}
          >
            endowment
          </a>
        </li>
        <li className="mr-1">
          <a
            href="##"
            className={getClassNames("programs")}
            onClick={() => onTabChange("programs")}
          >
            Programs
          </a>
        </li>
        <li className="mr-1">
          <a
            href="##"
            className={getClassNames("media")}
            onClick={() => onTabChange("media")}
          >
            News/media
          </a>
        </li>
        <li className="mr-1">
          <a
            href="##"
            className={getClassNames("governance")}
            onClick={() => onTabChange("governance")}
          >
            governance (dano)
          </a>
        </li>
      </ul>
    </nav>
  );
}
