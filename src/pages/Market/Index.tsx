import IndexCard from "./IndexCard";
import CharityCard from "./CharityCard";
import useProfiles from "./useProfiles";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import useHorizontalScroll from "hooks/useHorizontalScroll";
import { useEffect, useState } from "react";

function SliderArrow(props: any) {
  return (
    <button onClick={props.onClick} className={props.classes}>
      <MdOutlineArrowBackIosNew className="text-white text-4xl" />
    </button>
  );
}

export default function Index(props: { id: number }) {
  const profiles = useProfiles(props.id);
  const { ref, forward, backward, showBack, showForward } =
    useHorizontalScroll();
  const [list, setList] = useState(profiles);

  useEffect(() => {
    if (!showForward && !showBack) return;
    list.push(...profiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBack, showForward]);

  return (
    <section className="grid grid-cols-1 justify-items-left sm:grid-cols-charity mt-6 sm:mt-0 mb-10">
      <IndexCard id={props.id} />

      <section className="overflow-hidden relative sm:pl-10 group">
        <div
          ref={ref}
          className="flex flex-row gap-4 overflow-x-scroll scroll-hidden ml-0"
        >
          {list.map((profile, i) => (
            <CharityCard key={i} address={profile.endowment_address} />
          ))}
        </div>
        {showBack && (
          <SliderArrow
            classes="absolute top-14 left-0 p-2 bg-blue-accent bg-opacity-50 group-hover:flex group-hover:bg-opacity-60 hover:bg-opacity-80 w-22 h-22 flex rounded-full items-center justify-center group"
            onClick={backward}
          ></SliderArrow>
        )}
        {showForward && (
          <button
            onClick={forward}
            className="absolute top-14 right-0 p-2 bg-blue-accent bg-opacity-50 group-hover:flex group-hover:bg-opacity-60 hover:bg-opacity-80 w-22 h-22 flex rounded-full items-center justify-center group"
          >
            <MdOutlineArrowForwardIos className="text-white text-4xl " />
          </button>
        )}
      </section>
    </section>
  );
}
