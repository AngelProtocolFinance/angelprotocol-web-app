import useClickScroll from "hooks/useClickScroll";
import IndexCard from "./IndexCard";
import CharityCard from "./CharityCard";
import useProfiles from "./useProfiles";

export default function Index(props: { id: number }) {
  const profiles = useProfiles(props.id);
  const {
    ref,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useClickScroll();
  return (
    <section className="grid grid-cols-1 justify-items-left sm:grid-cols-charity mt-6 sm:mt-0">
      <IndexCard id={props.id} />
      <section
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`flex flex-row gap-4 overflow-x-scroll scroll-hidden ml-0 sm:ml-4`}
      >
        {profiles.map((profile) => (
          <CharityCard
            key={profile.endowment_address}
            address={profile.endowment_address}
          />
        ))}
      </section>
    </section>
  );
}
