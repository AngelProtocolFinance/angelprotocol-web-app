import useDonater from "components/Transactors/Donater/useDonater";
import { unsdgs } from "constants/unsdgs";
import { Profile } from "services/aws/endowments/types";
import CharityLinks from "./CharityLinks";

export default function CharityHeader(profile: Profile) {
  const showDonater = useDonater({
    to: "charity",
    receiver: profile.endowment_address!,
  });
  const sdg = unsdgs[+profile.un_sdg];

  return (
    <div className="justify-self-center lg:justify-self-end flex flex-col items-center lg:items-end gap-1  ">
      {profile.un_sdg && (
        <p
          className={`${sdg.text_light} ${sdg.bg} text-center lg:text-right text-xs mb-1 uppercase rounded-sm px-2 py-1 inline-block`}
        >
          SDG #{profile.un_sdg}: {sdg?.title}
        </p>
      )}

      <h3 className="text-3xl font-bold text-white uppercase text-center lg:text-right">
        {profile.charity_name}
      </h3>

      <CharityLinks classes="mb-2" />
      <button
        disabled={profile.is_placeholder}
        onClick={showDonater}
        className="disabled:bg-grey-accent uppercase bg-angel-orange hover:bg-orange text-white font-semibold rounded-md px-4 py-2"
      >
        DONATE NOW
      </button>
    </div>
  );
}
