import useDonater from "components/Transactors/Donater/useDonater";
import { unsdgs } from "constants/unsdgs";
import { Profile } from "services/aws/endowments/types";
import CharityLinks from "./CharityLinks";
import useTransak from "hooks/useTransak";

export default function CharityHeader(props: Profile) {
  const showDonater = useDonater({
    to: "charity",
    receiver: props.endowment_address!,
  });
  const sdg = unsdgs[+props.un_sdg];
  const { initTransak } = useTransak();

  return (
    <div className="flex flex-col items-start gap-2">
      {props.un_sdg && (
        <p
          className={`p-3 max-w-250 text-center bg-angel-blue/50 text-white text-sm uppercase font-heading font-bold rounded-xl`}
        >
          SDG #{props.un_sdg}: {sdg?.title}
        </p>
      )}

      <h3 className="text-3xl font-bold text-white uppercase">
        {props.charity_name}
      </h3>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          disabled={props.is_placeholder}
          onClick={initTransak}
          className="disabled:bg-grey-accent uppercase bg-orange hover:bg-angel-orange font-heading text-white font-semibold rounded-xl px-6 py-3"
        >
          DONATE NOW
        </button>
        <CharityLinks />
      </div>
    </div>
  );
}
