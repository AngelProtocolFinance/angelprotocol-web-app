import haloIcon from "assets/icons/currencies/halo_solid.png";
export default function Portal() {
  return (
    <div className="bg-white bg-opacity-10 border border-opacity-10 shadow-xl w-full col-start-2 row-span-2 rounded-md p-2 p-8 pb-6 grid grid-rows-a1">
      <div className="flex flex-wrap gap-2 items-center mb-10 lg:mb-0">
        <div className="relative">
          <div className="absolute w-full h-full border-4 border-white border-opacity-80 rounded-full animate-pulse shadow-md"></div>
          <img
            src={haloIcon}
            alt=""
            className="w-14 h-14 m-2 opacity-90 shadow-lg rounded-full"
          />
        </div>
        <span className="text-6xl text-white-grey font-bold -mr-1">HALO</span>
        <span className="sm:ml-auto text-3xl text-white-grey text-opacity-90">
          13.92% APR
        </span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center md:justify-self-end self-end">
        <Action title="Trade Halo" />
        <Action title="Stake" />
        <Action title="Unstake" />
      </div>
    </div>
  );
}

function Action(props: { title: string }) {
  return (
    <button className="text-white-grey border-2 border-white-grey opacity-80 hover:opacity-100 shadow-md w-36 uppercase text-center py-1 mb-1 lg:mb:0 rounded-full">
      {props.title}
    </button>
  );
}
