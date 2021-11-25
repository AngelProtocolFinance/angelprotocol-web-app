import Poll from "./Poll";

export default function Polls() {
  return (
    <div className="bg-white bg-opacity-70 border-t border-opacity-70 shadow-xl rounded-md h-ful p-6">
      <div className="flex items-center mb-4">
        <p className="uppercase text-2xl font-bold text-angel-grey mr-4">
          Polls
        </p>
        <p className="px-5 py-1 text-angel-grey hover:text-white-grey shadow-md border-2 border-angel-grey hover:border-white-grey uppercase text-center rounded-full ml-auto mr-4">
          <span></span>
          <span>Filter</span>
        </p>
        <button className="px-5 py-1 text-angel-grey hover:text-white-grey shadow-md border-2 border-angel-grey hover:border-white-grey uppercase text-center rounded-full">
          Create Poll
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
      </div>
    </div>
  );
}
