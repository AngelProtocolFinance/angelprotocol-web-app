import { ReactElement, cloneElement, useState } from "react";
import Icon, { DrawerIcon } from "components/Icon";

type Props = {
  id: string;
  classes?: string;
};

export default function Reference({ id, classes = "" }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div
      className={`${classes} w-full py-4 px-6 text-sm text-left md:text-center bg-gray-l4 dark:bg-blue-d3 text-gray-d2 dark:text-white md:text-gray-d1 md:dark:text-gray-l3 md:border-t border-prim rounded-b-lg`}
    >
      <div className="relative">
        <span className="font-semibold mr-2">Your registration number:</span>
        <span className="block mt-1 md:inline md:mt-0">{id}</span>

        <WithTooltip text={tooltip} classes="before:left-0 before:top-0">
          <span className="hidden md:inline-block ml-[1.333rem] top-0.5">
            <Icon type="Question" size={13} />
          </span>
        </WithTooltip>
        <button
          onClick={() => {
            setIsTooltipOpen((p) => !p);
          }}
          className="absolute -right-1 top-1/2 transform -translate-y-1/2 md:hidden"
        >
          <DrawerIcon isOpen={isTooltipOpen} size={25} />
        </button>
      </div>
      {isTooltipOpen && (
        <p className="md:hidden mt-4 dark:text-gray text-gray-d1">{tooltip}</p>
      )}
    </div>
  );
}

const tooltip =
  "Enter this number on the registration page to continue from where you finished.";

function WithTooltip(props: {
  classes?: string;
  children: ReactElement; //note: ::before doesn't seem to work on SVG elements;
  text: string;
}) {
  return cloneElement(props.children, {
    "data-before-content": props.text,
    className:
      props.children.props.className +
      ` ${
        props.classes ?? "" /** control position */
      } relative before:w-48 before:z-10 before:content-[attr(data-before-content)] hover:before:block before:hidden before:absolute  
      before:text-xs before:bg-gray-l4 before:dark:bg-blue-d3 before:text-gray-d1 before:dark:text-gray before:border before:border-prim before:p-2 before:rounded`,
  });
}
