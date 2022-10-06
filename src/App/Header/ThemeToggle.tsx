import { Switch } from "@headlessui/react";
import { useState } from "react";
import Icon from "components/Icon";

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <Switch
      checked={isDarkMode}
      onChange={setDarkMode}
      className="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full shadow-sm shadow-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-transparent"
    >
      <span className="sr-only">Enable dark mode</span>
      <Icon
        type="Clock"
        size={20}
        className={`h-3 w-3 rounded-full ${
          isDarkMode ? "bg-transparent text-white" : "bg-white text-black"
        }`}
      />
      <Icon
        type="ArrowBack"
        size={20}
        className={`h-3 w-3 rounded-full ${
          isDarkMode ? "bg-white text-black" : "bg-transparent text-white"
        }`}
      />
    </Switch>
  );
}
