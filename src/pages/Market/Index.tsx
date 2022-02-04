import IndexCard from "./IndexCard";
import CharityCard from "./CharityCard";
import useProfiles from "./useProfiles";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import useHorizontalScroll from "hooks/useHorizontalScroll";

export default function Index(props: { id: number }) {
  const profiles = useProfiles(props.id);
  const { ref, forward, backward, showBack, showForward } =
    useHorizontalScroll();
  return (
    <section className="grid grid-cols-1 justify-items-left sm:grid-cols-charity mt-6 sm:mt-0 mb-10">
      <IndexCard id={props.id} />

      <section className="overflow-hidden relative sm:pl-10 group">
        <>
          <div
            ref={ref}
            className="flex flex-row gap-4 overflow-x-scroll scroll-hidden ml-0"
          >
            {profiles.map((profile) => (
              <CharityCard
                key={profile.endowment_address}
                address={profile.endowment_address}
              />
            ))}
          </div>
          {showBack && (
            <button
              onClick={backward}
              className="absolute top-0 left-0 bg-blue-accent sm:bg-transparent bg-opacity-80  hidden group-hover:flex group-hover:bg-opacity-10 w-14 h-32 flex items-center justify-center group"
            >
              <MdOutlineArrowBackIosNew className="group-hover:text-white text-5xl" />
            </button>
          )}
          {showForward && (
            <button
              onClick={forward}
              className="absolute top-0 right-0 md:-right-4 bg-blue-accent sm:bg-transparent bg-opacity-80 hidden group-hover:flex group-hover:bg-opacity-10 w-14 h-32 flex items-center justify-center group"
            >
              <MdOutlineArrowForwardIos className="group-hover:text-white text-5xl " />
            </button>
          )}
        </>
      </section>
    </section>
  );
}
