import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useGetCharityListEndowmentQuery } from "services/aws/charity";
import { admin } from "types/routes";
import CharityTable from "./CharityTable";
import Loader from "components/Loader/Loader";
import withSideNav from "pages/Admin/withSideNav";
import { useGetter } from "store/accessors";

function CharityApps() {
  const { path } = useRouteMatch();
  const [isShowApproved, setIsShowApproved] = useState(false);
  const [charityList, setCharityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const adminAuthStatus = useGetter((state) => state.auth.admin.status);
  const { data } = useGetCharityListEndowmentQuery("");

  // get charity list
  useEffect(() => {
    setCharityList(data);
    setTableData(data);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchCharity = (event: any) => {
    const searchText = event?.target?.value;
    const filteredList = charityList?.filter(
      (item: any) =>
        item.TerraWallet.indexOf(searchText) >= 0 ||
        item.CharityName.indexOf(searchText) >= 0
    );
    setTableData(filteredList);
    setSearchWord(searchText);
  };

  const showApproved = () => {
    setTableData(
      data?.filter(
        (item: any) => item.EndowmentStatus === "Active" || isShowApproved
      )
    );
    setIsShowApproved(!isShowApproved);
  };

  const handleActivateCharity = () => {};

  const handleDeleteCharity = () => {};
  //user can't access TCA page when not logged in or his prev token expired
  if (adminAuthStatus !== "authorized") {
    return <Redirect to={`${path}/${admin.authentication}`} />;
  }

  return (
    <>
      <div className="flex-grow w-full min-h-3/4 p-10 text-center font-heading">
        <h2 className="text-2xl font-semibold capitalize text-center text-white">
          Charity Application Management
        </h2>
        <div className="flex justify-between w-full mt-10">
          <div className="search px-3 py-2 flex items-center bg-white rounded-md border-gray-200 w-80">
            <FiSearch className="text-gray-600 text-xl mr-2 hover:text-orange" />
            <input
              type="text"
              value={searchWord}
              onChange={searchCharity}
              className="text-gray-800 text-md w-full border-none outline-none "
              placeholder="filter/search address & name"
            />
          </div>
          <div className="flex items-center text-center justify-center">
            <label>
              <input type="checkbox" onChange={showApproved} className="mr-2" />
              <span className="text-base">Show approved</span>
            </label>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            {isLoading ? (
              <Loader
                bgColorClass="bg-white"
                widthClass="w-3"
                gapClass="gap-1"
              />
            ) : (
              <CharityTable
                onDelete={handleDeleteCharity}
                onCheckOut={handleActivateCharity}
                charityList={tableData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withSideNav(CharityApps);
