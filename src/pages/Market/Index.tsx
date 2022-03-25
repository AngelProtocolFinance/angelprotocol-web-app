import useHorizontalScroll from "hooks/useHorizontalScroll";
import IndexCard from "./IndexCard";
import CharityCard from "./CharityCard";
import { Profile } from "services/aws/endowments/types";
import Icon from "components/Icons/Icons";

export default function Index(props: { id: number; profiles: Profile[] }) {
  const { ref, forward, backward, showBack, showForward } =
    useHorizontalScroll();
  //remove infinite scroll temporarily

  return (
    <section className="grid grid-cols-1 justify-items-left sm:grid-cols-charity mt-6 sm:mt-0 mb-10">
      <IndexCard id={props.id} />

      <section className="overflow-hidden relative sm:pl-10 group">
        <div
          ref={ref}
          className="flex flex-row gap-4 overflow-x-scroll scroll-hidden ml-0"
        >
          {props.profiles.map((profile) => (
            <CharityCard key={profile.endowment_address} {...profile} />
          ))}
        </div>
        {showBack && (
          <SliderArrow
            classes="absolute top-14 left-0 p-2 bg-blue-accent bg-opacity-50 group-hover:flex group-hover:bg-opacity-60 hover:bg-opacity-80 w-22 h-22 flex rounded-full items-center justify-center group"
            onClick={backward}
          />
        )}
        {showForward && (
          <button
            onClick={forward}
            className="absolute top-14 right-0 p-2 bg-blue-accent bg-opacity-50 group-hover:flex group-hover:bg-opacity-60 hover:bg-opacity-80 w-22 h-22 flex rounded-full items-center justify-center group"
          >
            <Icon type="Forward" className="text-white text-4xl " />
          </button>
        )}
      </section>
    </section>
  );
}

function SliderArrow(props: any) {
  return (
    <button onClick={props.onClick} className={props.classes}>
      <Icon type="Back" className="text-white text-4xl" />
    </button>
  );
}
