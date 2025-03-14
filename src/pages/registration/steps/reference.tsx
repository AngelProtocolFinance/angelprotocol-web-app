import { DrawerIcon } from "components/icon";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { CircleHelp } from "lucide-react";
import { useState } from "react";

type Props = {
  id: string;
  classes?: string;
};

export default function Reference({ id, classes = "" }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div
      className={`${classes} w-full py-4 px-6 text-sm text-left md:text-center bg-gray-l6 dark:bg-blue-d5 text-gray-d4 dark:text-white md:text-gray md:dark:text-gray md:border-t border-gray-l3 rounded-b-lg`}
    >
      <div className="relative">
        <span className="font-semibold mr-2">Your registration number:</span>
        <span className="block mt-1 md:inline md:mt-0">{id}</span>

        <Tooltip
          tip={
            <Content className="p-3 text-xs bg-gray-d4 text-white max-w-xs rounded-sm">
              {tooltip}
              <Arrow />
            </Content>
          }
        >
          <CircleHelp
            size={13}
            className="hidden md:inline-block ml-[1.333rem]"
          />
        </Tooltip>
        <button
          onClick={() => {
            setIsTooltipOpen((p) => !p);
          }}
          className="absolute -right-1 top-1/2 transform -translate-y-1/2 md:hidden"
        >
          <DrawerIcon isOpen={isTooltipOpen} size={20} />
        </button>
      </div>
      {isTooltipOpen && (
        <p className="md:hidden mt-4 dark:text-gray text-gray">{tooltip}</p>
      )}
    </div>
  );
}

const tooltip =
  "Enter this number on the registration page to continue from where you finished.";
