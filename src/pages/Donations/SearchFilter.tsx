import { Menu, Popover } from "@headlessui/react";
import type { FC } from "react";
import Icon from "components/Icon";

interface SearchFilterProps {}

const SearchFilter: FC<SearchFilterProps> = ({}) => {
  return (
    <div>
      {/* {Mobile} */}
      <Popover className="sm:hidden">
        <Popover.Button
          className={
            "w-full flex justify-center items-center text-white bg-orange p-3 rounded-md"
          }
        >
          <Icon type="Filter" size={20}></Icon>
          <div className="uppercase font-semibold">Filter</div>
        </Popover.Button>

        <Popover.Panel className="fixed top-0 left-0 bg-white dark:bg-blue-d6 min-w-[100vw] min-h-[100vh] z-50 border border-gray-l2 dark:border-bluegray">
          <div className="flex flex-col">
            <div className="flex justify-between border-b-[1px] bg-orange-l6 dark:bg-blue-d7 border-gray-l2 dark:border-bluegray">
              <h2 className="text-xl text-orange font-bold p-5 uppercase">
                Filters
              </h2>
              <Popover.Button className="p-5">
                <Icon type="Close" size={24} className="text-gray-d2"></Icon>
              </Popover.Button>
            </div>
            <div className="flex justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
              <a href="#" className="text-orange underline">
                Reset filters
              </a>
              <button className="flex justify-center items-center text-white bg-orange p-3 rounded-md">
                Apply filter
              </button>
            </div>
            <div className="overflow-y-scroll">
              <div className="flex flex-col w-full p-6 gap-6 bg-white dark:bg-blue-d6">
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Date</label>
                  <div className="flex gap-4">
                    <input
                      type="date"
                      className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                      placeholder="From"
                    />
                    <input
                      type="date"
                      className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                      placeholder="To"
                    />
                  </div>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Network</label>
                  <Menu>
                    <Menu.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select network...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Menu.Button>
                    <Menu.Items>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "bg-blue-500"}`}
                            href="/account-settings"
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Currency</label>
                  <Menu>
                    <Menu.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select currency...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Menu.Button>
                    <Menu.Items>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "bg-blue-500"}`}
                            href="/account-settings"
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Status</label>
                  <Menu>
                    <Menu.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select status...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Menu.Button>
                    <Menu.Items>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "bg-blue-500"}`}
                            href="/account-settings"
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Popover>

      {/* {Desktop} */}
      <Popover className="hidden sm:block relative py-3 px-4 border border-gray-l2 dark:border-bluegray rounded-sm">
        <Popover.Button
          className={
            "w-full flex justify-between items-center outline-0 text-gray-d2 dark:text-white"
          }
        >
          <div className="uppercase font-semibold">Filter</div>
          <Icon type="ArrowDown" size={20}></Icon>
        </Popover.Button>

        <Popover.Panel className="absolute w-full right-[.05rem] z-10 border border-gray-l2 dark:border-bluegray rounded-sm mt-4">
          <div className="flex flex-col">
            <div>
              <div className="flex flex-col w-full p-6 gap-6 bg-white dark:bg-blue-d6">
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Date</label>
                  <div className="flex gap-4">
                    <input
                      type="date"
                      className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                      placeholder="From"
                    />
                    <input
                      type="date"
                      className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                      placeholder="To"
                    />
                  </div>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Recipient</label>
                  <Menu>
                    <Menu.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select recipient...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Menu.Button>
                    <Menu.Items>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "bg-blue-500"}`}
                            href="/account-settings"
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Network</label>
                  <Menu>
                    <Menu.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select network...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Menu.Button>
                    <Menu.Items>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "bg-blue-500"}`}
                            href="/account-settings"
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Currency</label>
                  <Menu>
                    <Menu.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select currency...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Menu.Button>
                    <Menu.Items>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "bg-blue-500"}`}
                            href="/account-settings"
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Status</label>
                  <Menu>
                    <Menu.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select status...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Menu.Button>
                    <Menu.Items>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "bg-blue-500"}`}
                            href="/account-settings"
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
              <div className="flex justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
                <a href="#" className="text-orange underline">
                  Reset filters
                </a>
                <button className="flex justify-center items-center text-white bg-orange p-3 rounded-md">
                  Apply filter
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
export default SearchFilter;
