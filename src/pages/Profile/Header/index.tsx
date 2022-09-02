import { Profile } from "types/contracts";
import useDonater from "components/Transactors/Donater/useDonater";
import { unsdgs } from "constants/unsdgs";
import { useProfile } from "..";
import CharityLinks from "./Links";

export default function CharityHeader(props: Profile) {
  const profile = useProfile();

  const showDonater = useDonater({
    to: "charity",
    receiver: profile.id,
  });

  //TODO: show multiple SDGs
  const sdgNum = props.categories.sdgs[0] || 0;
  const sdg = unsdgs[sdgNum];

  return (
    <div className="flex flex-col items-start gap-2">
      {sdgNum && (
        <p className="p-3 max-w-[250px] text-center bg-angel-blue/50 text-white text-sm uppercase font-heading font-bold rounded-xl">
          SDG #{sdgNum}: {sdg?.title}
        </p>
      )}

      <h3 className="text-3xl font-bold text-white uppercase">{props.name}</h3>

      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={showDonater}>DONATE NOW</Button>

        <CharityLinks />
      </div>
    </div>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="disabled:bg-grey-accent uppercase bg-orange hover:bg-angel-orange font-heading text-white font-semibold rounded-xl px-6 py-3"
      {...props}
    />
  );
}
