import { Switch } from "@headlessui/react";
import { useState } from "react";
import Icon, { IconTypes } from "components/Icon";

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <Switch
      checked={isDarkMode}
      onChange={setDarkMode}
      className="flex items-center justify-center gap-1 h-10 w-[92px] shrink-0 cursor-pointer rounded-full shadow-[inset_-.5px_.5px_2px] shadow-white-grey/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-transparent"
    >
      <span className="sr-only">Enable dark mode</span>
      <ToggleOption checked={!isDarkMode} icon="Sun" />
      <ToggleOption checked={isDarkMode} icon="Moon" />
    </Switch>
  );
}

const ToggleOption = (props: { checked: boolean; icon: IconTypes }) => (
  <span
    className={`flex items-center justify-center h-7 w-7 rounded-full pointer-events-none ${
      props.checked ? "bg-white" : "bg-transparent"
    }`}
  >
    <Icon
      type={props.icon}
      className={`text-lg ${props.checked ? "text-black" : "text-white"}`}
    />
  </span>
);
