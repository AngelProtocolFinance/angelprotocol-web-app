import { useState } from "react";
import { Link } from "react-router-dom";

import NavMenu from "components/Layout/NavMenu";
import TerraConnector from "components/TerraConnector/TerraConnector";
import logoImg from "assets/images/angelprotocol-horiz-wht.png";
import filterImg from "assets/images/filter.png";
import searchImg from "assets/images/search.png";
import homeMenuImg from "assets/images/homemenu.png";

type HeaderProps = {
  hasMenu: boolean;
  hasTitle: boolean;
};

const Header = ({ hasMenu, hasTitle }: HeaderProps) => {
  const [isOpenSearch, setOpenSearch] = useState(false);
  const [isOpenTerraMenu, setOpenTerraMenu] = useState(true);

  return (
    <header className="z-50">
      <nav className="container mx-auto flex justify-between items-center h-16 mt-5">
        <div className="container mx-auto flex justify-between items-center w-4/6">
          <Link to="/">
            <img src={logoImg} alt="AngelProtocol" width="150" />
          </Link>
          {hasMenu && (
            <div className="flex font-sans text-base w-9/12">
              <NavMenu />
            </div>
          )}
        </div>
        <div className="w-2/6 container mx-auto flex justify-end items-center">
          {hasTitle ? (
            <p className="font-bold text-white font-lg uppercase">
              give once, give forever
            </p>
          ) : (
            <div className="flex flex-row font-regular text-base text-white">
              <div className="flex flex-row search-bar items-center">
                <img src={filterImg} className="w-5 h-5 mr-2" />
                <img
                  className="w-5 h-5 mr-1"
                  src={searchImg}
                  onClick={() => setOpenSearch(!isOpenSearch)}
                />
                {isOpenSearch && (
                  <div className="rounded-xl h-8 border-gray-300 p-1 bg-white mr-1">
                    <input
                      className="border-transparent outline-none text-black w-52 pl-1"
                      type="text"
                      placeholder="Search"
                      name="searchkey"
                    />
                  </div>
                )}
              </div>
              {isOpenTerraMenu ? (
                <img
                  className="h-5"
                  src={homeMenuImg}
                  onClick={() => setOpenTerraMenu(!isOpenTerraMenu)}
                />
              ) : (
                <TerraConnector />
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
