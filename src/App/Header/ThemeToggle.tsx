import { Switch } from "@headlessui/react";
import Icon, { type IconType } from "components/Icon";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers";
import { useState } from "react";

export default function ThemeToggle({ classes = "" }: { classes?: string }) {
  const [isDark, setIsDark] = useState(isPrevDark());

  function toggle(isDark: boolean) {
    if (isDark) {
      setToDarkMode();
    } else {
      setToLightMode();
    }
    setIsDark(isDark);
  }

  return (
    <Switch
      checked={isDark}
      onChange={toggle}
      className={`${classes} items-center justify-center gap-1 h-10 w-20 shrink-0 cursor-pointer rounded-3xl border border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-transparent`}
    >
      <span className="sr-only">Enable dark mode</span>
      <ToggleOption checked={!isDark} icon="Sun" />
      <ToggleOption checked={isDark} icon="Moon" />
    </Switch>
  );
}

const ToggleOption = (props: { checked: boolean; icon: IconType }) => (
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
