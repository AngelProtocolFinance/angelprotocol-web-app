import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import Icon, { IconTypes } from "components/Icon";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers";

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(isPrevDark);

  useEffect(() => {
    if (isDarkMode) {
      setToDarkMode();
    } else {
      setToLightMode();
    }
  }, [isDarkMode]);

  return (
    <Switch
      checked={isDarkMode}
      onChange={setDarkMode}
      className="flex items-center justify-center gap-1 h-10 w-20 shrink-0 cursor-pointer rounded-3xl border border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-transparent"
    >
      <span className="sr-only">Enable dark mode</span>
      <ToggleOption checked={!isDarkMode} icon="Sun" />
      <ToggleOption checked={isDarkMode} icon="Moon" />
    </Switch>
  );
}

const ToggleOption = (props: { checked: boolean; icon: IconTypes }) => (
  <span
    aria-hidden="true"
    className={`flex items-center justify-center h-8 w-8 rounded-full pointer-events-none ${
      props.checked ? "bg-white" : "bg-transparent"
    }`}
  >
    <Icon
      type={props.icon}
      className={`text-lg ${props.checked ? "text-black" : "text-white"}`}
    />
  </span>
);
