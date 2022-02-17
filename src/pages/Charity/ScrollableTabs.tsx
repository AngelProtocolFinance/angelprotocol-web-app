import useHorizontalScroll from "hooks/useHorizontalScroll";
import { ReactNode } from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const ScrollableTabs = (props: { children: ReactNode }) => {
  const { ref, forward, backward, showBack, showForward } = useHorizontalScroll(
    { duration: 300 }
  );

  return (
    <ul
      ref={ref}
      className="flex font-body text-sm lg:text-base ml-1 block w-full overflow-hidden overflow-x-auto scroll-hidden"
    >
      <>
        {props.children}
        {showBack && (
          <button
            className="absolute top-1 left-0 p-2 bg-blue-accent bg-opacity-50 group-hover:flex hover:bg-opacity-100 w-10 h-10 flex rounded-full items-center justify-center group"
            onClick={backward}
          >
            <MdOutlineArrowBackIosNew className="text-white text-2xl" />
          </button>
        )}
        {showForward && (
          <button
            onClick={forward}
            className="absolute top-1 right-0 p-1 bg-blue-accent bg-opacity-50 group-hover:flex hover:bg-opacity-100 w-10 h-10 flex rounded-full items-center justify-center group"
          >
            <MdOutlineArrowForwardIos className="text-white text-2xl " />
          </button>
        )}
      </>
    </ul>
  );
};

export default ScrollableTabs;
