import { UNSDG_NUMS } from "types/lists";
import { unsdgs } from "constants/unsdgs";

export default function IndexCard(props: { id: UNSDG_NUMS }) {
  const sdg = unsdgs[props.id];

  return (
    <div className="w-full sm:w-60 text-white pt-3">
      <img
        src={sdg.icon}
        className="hidden sm:block w-36 h-16 object-contain img-no-drag object-left"
        alt="icon representing category"
      />
      <p className="font-heading font-bold uppercase mt-2 text-left">
        SDG #{props.id}: {sdg.title}
      </p>
      <p className="text-sm mb-1.5 line-clamp-2 text-left">{sdg.desc}</p>
      {/* <button className="w-48 uppercase bg-green-l1 disabled:bg-gray p-1.5 rounded-lg font-bold text-sm mt-1">
        Donate to index
      </button> */}
    </div>
  );
}
