import Balances from "./Balances";

export default function DetailsColumn({ className = "" }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Balances />
      <div className={`${className} w-full lg:w-96`}>
        <div className="flex flex-col gap-8 w-full p-8 border border-gray-l4 rounded" />
      </div>
    </div>
  );
}
