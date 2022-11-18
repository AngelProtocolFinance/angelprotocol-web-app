import { useState } from "react";
import Icon, { DrawerIcon } from "components/Icon";

type Props = {
  id: string;
  classes?: string;
};

const tooltip =
  "Enter this number on the registration page to continue from where you finished.";

export default function Reference({ id, classes = "" }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  return (
    <div
      className={`${classes} relative w-full py-4 px-6 text-sm text-left md:text-center bg-gray-l5 dark:bg-blue-d4 text-gray-d2 dark:text-white md:text-gray-d1 md:dark:text-gray md:border-t border-gray-l2 dark:border-bluegray rounded-b-lg`}
    >
      <span className="font-semibold">Your registration number:</span>
      <span className="block mt-1 md:inline md:mt-0">{id}</span>
      <Icon
        type="Question"
        className="hidden md:inline bottom-px relative ml-[1.333rem]"
        size={13}
      />

      <button className="absolute right-6 top-1/2 transform -translate-y-1/2 md:hidden">
        <DrawerIcon isOpen={isTooltipOpen} size={25} />
      </button>
    </div>
  );
}
