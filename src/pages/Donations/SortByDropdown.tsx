import { Menu, Popover } from "@headlessui/react";
import type { FC } from "react";
import Icon from "components/Icon";

interface SortByDropdownProps {}

const SortByDropdown: FC<SortByDropdownProps> = ({}) => {
  return (
    <Popover className="relative py-3 px-4 border border-gray-l2 dark:border-bluegray rounded-sm">
      <Popover.Button
        className={"w-full flex justify-between items-center outline-0"}
      >
        <div className="uppercase font-semibold text-gray-d2 dark:text-gray">
          Sort by
        </div>
        <Icon type="ArrowDown" size={20}></Icon>
      </Popover.Button>

      <Popover.Panel className="absolute w-full right-[.05rem] z-10 border border-gray-l2 rounded-sm mt-4">
        <div className="flex flex-col">
          <div>
            <div className="flex flex-col w-full p-6 gap-6 bg-white">
              <div className="flex flex-col text-gray-d2 gap-2">
                <label>Date</label>
                <div className="flex gap-4">
                  <input
                    type="date"
                    className="w-full py-3 pl-3 border border-gray-l2 rounded-sm"
                    placeholder="From"
                  />
                  <input
                    type="date"
                    className="w-full py-3 pl-3 border border-gray-l2 rounded-sm"
                    placeholder="To"
                  />
                </div>
              </div>
              <div className="flex flex-col text-gray-d2 gap-2">
                <label>Recipient</label>
                <Menu>
                  <Menu.Button
                    className={
                      "inline-flex w-full justify-between items-center border border-gray-l2 rounded-sm p-3"
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
                <label>Network</label>
                <Menu>
                  <Menu.Button
                    className={
                      "inline-flex w-full justify-between items-center border border-gray-l2 rounded-sm p-3"
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
                <label>Currency</label>
                <Menu>
                  <Menu.Button
                    className={
                      "inline-flex w-full justify-between items-center border border-gray-l2 rounded-sm p-3"
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
                <label>Status</label>
                <Menu>
                  <Menu.Button
                    className={
                      "inline-flex w-full justify-between items-center border border-gray-l2 rounded-sm p-3"
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
            <div className="py-6 pl-6 bg-orange-l6">
              <a href="#" className="text-orange underline">
                Reset filters
              </a>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
export default SortByDropdown;
