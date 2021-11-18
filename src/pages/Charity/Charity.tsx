import { useState } from "react";
import YouTube, { Options } from "react-youtube";

import AppHead from "components/Headers/AppHead";
// import UserForm from "components/Donator/UserForm";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";

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
    <nav className="w-full overflow-x-scroll grid grid-cols-a1a items-center justify-items-end md:justify-items-center padded-container">
      <ul
        className={`hidden md:flex justify-self-end items-center font-body text-sm lg:text-base`}
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
    <section className="container mx-auto grid pb-16 content-start gap-0 overflow-hidden">
      <AppHead />
      <div className="flex lg:grid-cols-2 justify-start align-items-start w-full md:mx-auto md:container min-h-r15 max-h-75vh gap-0 mt-3">
        <div className="flex flex-col w-128 min-h-3/4 hidden md:block bg-transparent py-10 pr-10">
          <span className="inline-block text-center text-md py-3 px-3 font-semibold uppercase text-gray-200 bg-angel-blue bg-opacity-50 hover:bg-opacity-30 rounded-2xl border-t border-b border-opacity-20 -mt-4">
            SDG #5: GENDER EQUALITY
          </span>
          <h2 className="text-5xl font-bold text-white uppercase mt-4 tracking-wide">
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
          {/* charity stats */}
          <div className="overflow-y-scroll max-h-modal mt-2">
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
        <div className="flex-grow w-full min-h-3/4 p-10 text-center bg-indigo">
          <img
            className="flex flex-grow w-full min-h-1/2 bg-banner-charities bg-white rounded-2xl -mt-4 shadow-md mb-10"
            alt=""
          />
          {/* charity info */}
          <CharityInfoNav
            activeTab={activeTab}
            onTabChange={(tab: string) => setActiveTab(tab)}
          ></CharityInfoNav>
          {/* charity info */}
          {/* Information tabs  */}
          <div className="w-full overflow-y-scroll min-h-r15 max-h-modal bg-yellow-100 m-0 px-2 mt-2"></div>
          {/* Information tabs  */}
        </div>
      </div>
    </section>
  );
};

export default Charity;
