import Icon from "components/Icons/Icons";
import useHorizontalScroll from "hooks/useHorizontalScroll";
import { ReactNode } from "react";

const ScrollableTabs = (props: { children: ReactNode }) => {
  const { ref, forward, backward, showBack, showForward } = useHorizontalScroll(
    { duration: 300 }
  );

  return (
    <ul
      ref={ref}
      className="bg-white text-angel-grey flex font-body text-sm lg:text-base ml-1 block w-full overflow-hidden overflow-x-auto scroll-hidden divide-x"
    >
      {props.children}
      {showBack && (
        <button
          className="absolute top-1 left-0 p-2 bg-blue-accent/50 group-hover:flex hover:bg-blue-accent/100 w-10 h-10 flex rounded-full items-center justify-center group"
          onClick={backward}
        >
          <Icon type="Back" className="text-white text-2xl" />
        </button>
      )}
      {showForward && (
        <button
          onClick={forward}
          className="absolute top-1 right-0 p-1 bg-blue-accent/50 group-hover:flex hover:bg-blue-accent/100 w-10 h-10 flex rounded-full items-center justify-center group"
        >
          <Icon type="Forward" className="text-white text-2xl " />
        </button>
      )}
    </ul>
  );
};

export default ScrollableTabs;
