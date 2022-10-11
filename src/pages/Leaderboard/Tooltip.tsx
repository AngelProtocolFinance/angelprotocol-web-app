export default function Tooltip() {
  return (
    <p className="fixed font-body normal-case font-normal leading-relaxed bg-white p-4 rounded-lg shadow-xl w-72">
      10-year projection of endowment's principal and cumulative donations.
      Assumes <span className="text-gray-d2 font-bold">20%</span> yield, split
      as follows: <span className="text-green-d2 font-bold">75%</span> to
      charity and <span className="text-blue-d1 font-bold">25% </span>
      reinvested
    </p>
  );
}
