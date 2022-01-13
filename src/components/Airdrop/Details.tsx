import { FaParachuteBox } from "react-icons/fa";
export default function Details() {
  return (
    <div className="bg-white grid content-start justify-items-center p-4 rounded-md w-full shadow-lg min-h-115 max-w-md w-full">
      <FaParachuteBox className="text-angel-blue text-4xl" />
      <h2 className="text-angel-blue text-2xl font-bold uppercase text-center mt-2">
        Airdrop
      </h2>
      <p className="text-angel-blue font-heading text-2xl mt-4">1000 HALO</p>
      <div className="flex gap-2 mt-auto align-self-end">
        <Action />
        <Action />
      </div>
    </div>
  );
}

function Action() {
  return (
    <button className="bg-angel-orange px-4 py-1 rounded-md uppercase font-heading text-sm ">
      claim
    </button>
  );
}
