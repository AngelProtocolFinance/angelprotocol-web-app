import filterImg from "assets/images/filter.png";
import searchImg from "assets/images/search.png";
import { useState } from "react";
export default function Search() {
  const [isOpenSearch, setOpenSearch] = useState(false);
  return (
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
  );
}
