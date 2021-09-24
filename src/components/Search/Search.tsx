import { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

export default function Search() {
  const [isOpenSearch, setOpenSearch] = useState(false);
  function toggleSearch() {
    setOpenSearch((prevState) => !prevState);
  }

  return (
    <div className="flex flex-row items-center">
      <BsFilterRight className={`text-white text-xl`} />
      <button onClick={toggleSearch}>
        <FiSearch className={`text-white text-xl mx-2`} />
      </button>
      {isOpenSearch && (
        <div className={`rounded-xl h-8 border border-white p-1 bg-white mr-1`}>
          <input
            className={`text-sm md:text-base outline-none text-black w-52 pl-1`}
            type="text"
            placeholder="Search"
            name="searchkey"
          />
        </div>
      )}
    </div>
  );
}
