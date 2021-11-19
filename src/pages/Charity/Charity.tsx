import { useState } from "react";
import AppHead from "components/Headers/AppHead";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const mockCharityStats: any = [
  { title: "Headquaters", value: "Anytown, County, Country", rating: false },
  { title: " annual avg overhead", value: "A$14M", rating: false },
  { title: " annual avg donations", value: "A$14M", rating: false },
  { title: " # of employees", value: "5,600", rating: false },
  { title: " navigator rating", value: "90/100", rating: true },
  { title: " navigator rating", value: "94/100", rating: true },
];

function StatsItem({
  title,
  value,
  rating,
}: {
  title: string;
  value: string;
  rating: Boolean;
}) {
  return (
    <div className="paragraph mb-4">
      <p className="text-base text-white font-light text-xs tracking-wide uppercase">
        {title}
      </p>
      <p
        className={`text-base text-white text-2xl font-semibold capitalize break-words w-115 ${
          rating && "text-leaf-green"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CharityInfoNav({
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
    <nav className="w-full overflow-x-scroll grid grid-cols-a1a items-center justify-between md:justify-items-center 2xl:padded-container mb-5 2xl:mb-0">
      <ul
        className={`flex justify-between items-center font-body text-sm lg:text-base overflow-x-scroll`}
      >
        <li className="mr-1">
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
            endowement
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

const Charity = () => {
  const [isDonate, setIsDonate] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const toggleDonate = () => {
    setIsDonate(!isDonate);
  };

  return (
    <section className="container mx-auto grid pb-16 content-start gap-0 overflow-x-hidden">
      <AppHead />
      <div className="flex flex-col-reverse 2xl:flex-row align-items-start w-full md:mx-auto md:container min-h-r15 max-h-75vh gap-0 lg:mt-3 overflow-y-scroll overflow-x-hidden">
        <div className="flex flex-col lg:flex-row justify-between 2xl:justify-start lg:mr-10 w-full 2xl:flex-col 2xl:w-128 min-h-3/4 bg-transparent py-10">
          <div className="flex flex-col xl:w-128 2xl:min-h-1/2 bg-transparent px-10 mt-10 2xl:mt-0">
            <span className="inline-block text-center text-md py-3 px-3 max-w-250 font-semibold uppercase text-gray-200 bg-angel-blue bg-opacity-50 hover:bg-opacity-30 rounded-2xl border-t border-b border-opacity-20 2xl:-mt-4">
              SDG #5: GENDER EQUALITY
            </span>
            <h2 className="text:4xl lg:text-5xl font-bold text-white uppercase mt-4 tracking-wide">
              Women for women international
            </h2>
            <div className="flex flex-row gap-2 mt-4">
              <button
                className="uppercase bg-orange text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center mb-4"
                onClick={toggleDonate}
              >
                DONATE NOW
              </button>
              {/* create a customizable IconButton component to replace all occurrences of this */}
              <button className="h-10 w-10 bg-transparent py-2 px-2 mt-1 rounded-full inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey">
                <FaTwitter color="#3FA9F5" size="25" />
              </button>
              <button className="h-10 w-10 bg-transparent py-2 px-2 mt-1 rounded-full inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey">
                <FaLinkedinIn color="#3FA9F5" size="25" />
              </button>
              <button className="h-10 w-10 bg-transparent py-2 px-2 mt-1 rounded-full inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey">
                <FaFacebookSquare color="#3FA9F5" size="25" />
              </button>
            </div>
          </div>
          {/* charity stats */}
          <div className="flex flex-col h-full 2xl:h-80 px-10 lg:mt-10 2xl:mt-0 overflow-y-scroll">
            {mockCharityStats.map(
              ({ title, value, rating }: any, i: number) => (
                <StatsItem
                  key={i}
                  title={title}
                  value={value}
                  rating={rating}
                ></StatsItem>
              )
            )}
          </div>
          {/* charity stats */}
        </div>
        <div className="flex-grow min-h-3/4 p-10 text-center bg-indigo mb-10 2xl:mb-0">
          <img
            className="rounded-2xl 2xl:-mt-4 shadow-md mb-10"
            style={{ width: "99%", maxHeight: "300px" }}
            src="/static/media/home-banner.73980c69.jpg"
            alt=""
          />
          {/* charity info */}
          <CharityInfoNav
            activeTab={activeTab}
            onTabChange={(tab: string) => setActiveTab(tab)}
          ></CharityInfoNav>
          {/* charity info */}
          {/* Information tabs  */}
          <div className="w-full overflow-y-scroll min-h-1/2 max-h-modal py-10 mt-2 2xl:mb-5 text-left">
            <span className="text-white font-normal text-md inline-block mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              atque dolorum dolorem. Velit pariatur tempora quasi vitae
              inventore natus at possimus. Corporis ab voluptatum consequuntur
              dignissimos voluptates harum ad quasi?
            </span>
            <span className="text-white font-normal text-md inline-block mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              atque dolorum dolorem. Velit pariatur tempora quasi vitae
              inventore natus at possimus. Corporis ab voluptatum consequuntur
              dignissimos voluptates harum ad quasi?
            </span>
            <span className="text-white font-normal text-md inline-block mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              atque dolorum dolorem. Velit pariatur tempora quasi vitae
              inventore natus at possimus. Corporis ab voluptatum consequuntur
              dignissimos voluptates harum ad quasi?
            </span>
            <span className="text-white font-normal text-md inline-block mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              atque dolorum dolorem. Velit pariatur tempora quasi vitae
              inventore natus at possimus. Corporis ab voluptatum consequuntur
              dignissimos voluptates harum ad quasi?
            </span>
          </div>
          {/* Information tabs  */}
        </div>
      </div>
    </section>
  );
};

export default Charity;
