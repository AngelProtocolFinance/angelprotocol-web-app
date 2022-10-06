import { Switch } from "@headlessui/react";
import { useState } from "react";
import Icon from "components/Icon";

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <Switch
      checked={isDarkMode}
      onChange={setDarkMode}
      className="relative flex items-center justify-around h-10 w-[86px] shrink-0 cursor-pointer rounded-full shadow-[inset_-.5px_.5px_2px] shadow-white-grey/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-transparent"
    >
      <span className="sr-only">Enable dark mode</span>
      <span
        className={`flex items-center justify-center h-7 w-7 rounded-full pointer-events-none ${
          isDarkMode ? "bg-transparent" : "bg-white"
        }`}
      >
        <Icon
          type="Clock"
          className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}
        />
      </span>
      <span
        className={`flex items-center justify-center h-7 w-7 rounded-full pointer-events-none ${
          isDarkMode ? "bg-white" : "bg-transparent"
        }`}
      >
        <Icon
          type="MoneyBill"
          className={`text-xl ${isDarkMode ? "text-black" : "text-white"}`}
        />
      </span>
    </Switch>
  );
}
