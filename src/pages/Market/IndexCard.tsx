import { unsdgs } from "pages/Fund/unsdgs";

export default function IndexCard(props: { id: number }) {
  const sdg = unsdgs[props.id];

  return (
    <div className="w-full sm:w-60 text-white sm:py-8 border-t border-white border-opacity-40">
      <img
        src={sdg.icon}
        className="hidden sm:block w-36 h-16 object-contain img-no-drag object-left"
        alt="icon representing category"
      />
      <p className="font-heading font-bold uppercase mt-2 text-left">
        {sdg.title}
      </p>
      <p className="text-sm mb-1.5 line-clamp-2 text-left">{sdg.desc}</p>
      {/* <button className="w-48 uppercase bg-yellow-blue disabled:bg-grey-accent p-1.5 rounded-lg font-bold text-sm mt-1">
        Donate to index
      </button> */}
    </div>
  );
}
