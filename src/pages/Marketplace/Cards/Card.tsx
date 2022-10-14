import { EndowmentEntry } from "types/contracts";

export default function Card({ name, image }: EndowmentEntry) {
  return (
    <div className="rounded-md grid grid-rows-[1fr_auto] overflow-clip border border-gray-l2">
      <img
        src={image}
        className="h-44 object-cover bg-blue-l4"
        alt=""
        onError={(e) => {
          e.currentTarget.classList.add("bg-blue-l3");
        }}
      />
      <div className="p-3">
        <h3 className="font-bold">{name}</h3>
        <p className="text-gray-d1 text-sm mt-0.5">Country, city</p>
      </div>
      <div className="flex text-2xs font-bold px-3 pb-3 gap-1">
        <SDG num={1} />
        <SDG num={2} />
        <SDG num={3} />
      </div>
    </div>
  );
}

function SDG({ num }: { num: number }) {
  return (
    <div className="bg-blue-l4 uppercase rounded-full px-2 py-0.5">
      SDG #{num}
    </div>
  );
}
